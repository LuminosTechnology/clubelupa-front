import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { GamificationSummaryResponse, Medal } from "../types/api/user";
import { getGamificationSummary } from "../services/auth-service";
import { useAuthContext } from "./AuthContext";

import { RewardsApiResponse, RewardItem } from "../types/api/rewards";

type GamificationContextType = {
  gamificationSummary: GamificationSummaryResponse | undefined;
  setGamificationSummary: React.Dispatch<
    React.SetStateAction<GamificationSummaryResponse | undefined>
  >;
  refetchGamificationSummary: () => void;
  currentReward: RewardItem | null; 
  addRewardsToQueue: (rewards: RewardsApiResponse) => void;
  dismissCurrentReward: () => void;
  postRewardRedirect: string | null;
  setPostRewardRedirect: React.Dispatch<React.SetStateAction<string | null>>;
  clearPostRewardRedirect: () => void;
  setSelectedMedalState: (medal: Medal | null) => void;
  selectedMedal: Medal | null;
};

export const GamificationContext = createContext<GamificationContextType>(
  {} as GamificationContextType
);

type Props = {
  children: React.ReactNode;
};

export function GamificationProvider({ children }: Props) {

  const [gamificationSummary, setGamificationSummary] = useState<
    GamificationSummaryResponse | undefined
  >();

  const [rewardQueue, setRewardQueue] = useState<RewardItem[]>([]);
  const [currentReward, setCurrentReward] = useState<RewardItem | null>(null);

   const [postRewardRedirect, setPostRewardRedirect] = useState<string | null>(null);
   const [selectedMedal, setSelectedMedal] = useState<Medal | null>(null);

  const { user, isAuthenticated } = useAuthContext();

  const refetchGamificationSummary = async () => {
    await fetchGamificationSummary();
  };

  const fetchGamificationSummary = useCallback(async () => {
    if (!user || !isAuthenticated) return;
    try {
        const response = await getGamificationSummary();
        setGamificationSummary(response);
    } catch(error) {
        console.error("Falha ao buscar sumário de gamificação:", error);
    }
  }, [user, isAuthenticated]);


  const addRewardsToQueue = (rewards: RewardsApiResponse) => {
    const newRewards: RewardItem[] = [];

    if (rewards.points_earned > 0) {
      newRewards.push({ type: 'points', data: { amount: rewards.points_earned } });
    }
    if (rewards.coins_earned > 0) {
      newRewards.push({ type: 'coins', data: { amount: rewards.coins_earned } });
    }
    if (rewards.level_up_info) {
      newRewards.push({ type: 'level_up', data: rewards.level_up_info });
    }
    rewards.medals_earned.forEach(medal => {
      newRewards.push({ type: 'medal', data: medal });
    });

    if (newRewards.length > 0) {
        setRewardQueue(prevQueue => [...prevQueue, ...newRewards]);
    }
  };

  useEffect(() => {
    fetchGamificationSummary();
  }, [user, isAuthenticated]);

  // Escuta eventos de gamificação do interceptor
  useEffect(() => {
    const handleGamificationRewards = (event: CustomEvent) => {
      const rewardsData = event.detail as RewardsApiResponse;
      addRewardsToQueue(rewardsData);
      
      // Atualiza o resumo da gamificação após receber recompensas
      setTimeout(() => {
        refetchGamificationSummary();
      }, 1000);
    };

    window.addEventListener('gamification-rewards', handleGamificationRewards as EventListener);

    return () => {
      window.removeEventListener('gamification-rewards', handleGamificationRewards as EventListener);
    };
  }, [addRewardsToQueue, refetchGamificationSummary]);

  const dismissCurrentReward = () => {
    setCurrentReward(null);

    if (postRewardRedirect) {
      setPostRewardRedirect(null);
    }
  };

  const clearPostRewardRedirect = () => {
    setPostRewardRedirect(null);
  };

useEffect(() => {
    if (!currentReward && rewardQueue.length > 0) {
      
      const timer = setTimeout(() => {
        const [nextReward, ...remainingQueue] = rewardQueue;
        
        // Define o próximo item como a recompensa atual (o que vai fazer a modal aparecer)
        setCurrentReward(nextReward);
        
        // Atualiza a fila para conter apenas os itens restantes
        setRewardQueue(remainingQueue);

      }, 600); 

      return () => clearTimeout(timer);
    }
  }, [rewardQueue, currentReward]);

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log("Modo de teste de gamificação ativado. Use window.testRewards(data) no console.");
      window.testRewards = addRewardsToQueue;
    }
  }, [addRewardsToQueue]);

  const setSelectedMedalState = (medal: Medal | null) => {
    setSelectedMedal(medal);
  };

  return (
    <GamificationContext.Provider
      value={{
        gamificationSummary,
        setGamificationSummary,
        refetchGamificationSummary,
        currentReward,
        addRewardsToQueue,
        dismissCurrentReward,
        postRewardRedirect, 
        setPostRewardRedirect, 
        clearPostRewardRedirect,
        setSelectedMedalState,
        selectedMedal
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
}

export const useGamificationContext = () => useContext(GamificationContext);

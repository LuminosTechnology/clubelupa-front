import { createContext, useContext, useEffect, useState } from "react";
import { GamificationSummaryResponse, GamificationReward } from "../types/api/user";
import { getGamificationSummary } from "../services/auth-service";
import { useAuthContext } from "./AuthContext";

type GamificationRewardNotification = {
  hasRewards: boolean;
  hasLevelUp: boolean;
  hasNewMedals: boolean;
  hasCoins: boolean;
  hasPoints: boolean;
  rewards: GamificationReward;
};

type GamificationContextType = {
  gamificationSummary: GamificationSummaryResponse | undefined;
  setGamificationSummary: React.Dispatch<
    React.SetStateAction<GamificationSummaryResponse | undefined>
  >;
  refetchGamificationSummary: () => void;
  latestReward: GamificationRewardNotification | null;
  clearLatestReward: () => void;
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
  const [latestReward, setLatestReward] = useState<GamificationRewardNotification | null>(null);

  const { user, isAuthenticated } = useAuthContext();

  const refetchGamificationSummary = async () => {
    await fetchGamificationSummary();
  };

  const fetchGamificationSummary = async () => {
    if (!user || !isAuthenticated) return;
    const response = await getGamificationSummary();
    setGamificationSummary(response);
  };

  const clearLatestReward = () => {
    setLatestReward(null);
  };

  useEffect(() => {
    fetchGamificationSummary();
  }, [user, isAuthenticated]);

  // Escuta eventos de gamificação do interceptor
  useEffect(() => {
    const handleGamificationRewards = (event: CustomEvent) => {
      const rewardData = event.detail as GamificationRewardNotification;
      setLatestReward(rewardData);
      
      // Atualiza o resumo da gamificação após receber recompensas
      setTimeout(() => {
        refetchGamificationSummary();
      }, 1000);
    };

    window.addEventListener('gamification-rewards', handleGamificationRewards as EventListener);

    return () => {
      window.removeEventListener('gamification-rewards', handleGamificationRewards as EventListener);
    };
  }, []);

  console.log({ gamificationSummary, latestReward });

  return (
    <GamificationContext.Provider
      value={{
        gamificationSummary,
        setGamificationSummary,
        refetchGamificationSummary,
        latestReward,
        clearLatestReward,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
}

export const useGamificationContext = () => useContext(GamificationContext);

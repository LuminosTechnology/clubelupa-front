import { createContext, useContext, useEffect, useState } from "react";
import { GamificationSummaryResponse } from "../types/api/user";
import { getGamificationSummary } from "../services/auth-service";
import { useAuthContext } from "./AuthContext";

type GamificationContextType = {
  gamificationSummary: GamificationSummaryResponse | undefined;
  setGamificationSummary: React.Dispatch<
    React.SetStateAction<GamificationSummaryResponse | undefined>
  >;
  refetchGamificationSummary: () => void;
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

  const { user, isAuthenticated } = useAuthContext();

  const refetchGamificationSummary = async () => {
    await fetchGamificationSummary();
  };

  const fetchGamificationSummary = async () => {
    if (!user || !isAuthenticated) return;
    const response = await getGamificationSummary();
    setGamificationSummary(response);
  };

  useEffect(() => {
    fetchGamificationSummary();
  }, [user, isAuthenticated]);

  console.log({ gamificationSummary });

  return (
    <GamificationContext.Provider
      value={{
        gamificationSummary,
        setGamificationSummary,
        refetchGamificationSummary,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
}

export const useGamificationContext = () => useContext(GamificationContext);

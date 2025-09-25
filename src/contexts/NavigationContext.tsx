import React, { createContext, useContext, useState, ReactNode } from "react";

interface NavigationContextType {
  isMainMenuNavigation: boolean;
  setIsMainMenuNavigation: (value: boolean) => void;
  mainMenuRoutes: string[];
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [isMainMenuNavigation, setIsMainMenuNavigation] = useState(false);

  const mainMenuRoutes = [
    "/home",
    "/profile",
    "/affiliates",
    "/lupacoins",
    "/myplan",
    "/favorites",
    "/experience",
    "/recommendandwin",
    "/affiliate/area",
    "/affiliate/paywall",
    "/affiliate/become"
  ];

  return (
    <NavigationContext.Provider value={{
      isMainMenuNavigation,
      setIsMainMenuNavigation,
      mainMenuRoutes
    }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationContext = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigationContext must be used within a NavigationProvider");
  }
  return context;
};

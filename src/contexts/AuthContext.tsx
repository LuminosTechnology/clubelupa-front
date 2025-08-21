import { Preferences } from "@capacitor/preferences";
import { AxiosError } from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { LOCAL_STORAGE_KEYS } from "../config/constants";
import { getToken, getUserByToken } from "../services/auth-service";
import { User } from "../types/api/api";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  loading: boolean;
  user?: User;
  setUser: (value?: User) => void;
  logout: () => void;
  refetchUser: () => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

type Props = {
  children: React.ReactNode;
};

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | undefined>();

  const logout = () => {
    setIsAuthenticated(false);
    setUser(undefined);
    Preferences.remove({ key: LOCAL_STORAGE_KEYS.AUTH_TOKEN });
  };

  const fetchToken = async () => {
    const token = await getToken();

    if (!token) {
      setIsAuthenticated(false);
      setUser(undefined);
      logout();
    }

    try {
      const user = await getUserByToken();
      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  useEffect(() => {
    if (!!user) {
      setIsAuthenticated(true);
    }
  }, [user]);

  const refetchUser = async () => {
    fetchToken();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        loading,
        user,
        setUser,
        logout,
        refetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

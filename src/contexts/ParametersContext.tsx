import { createContext, useContext, useEffect, useState } from "react";
import { AppParameters } from "../types/api/parameters";
import { ParametersService } from "../services/parameters";

type ParametersContextType = {
  data?: AppParameters;
  refetchData: () => unknown;
};

export const ParameterContext = createContext<ParametersContextType>(
  {} as ParametersContextType
);

type Props = {
  children: React.ReactNode;
};

export const ParametersProvider: React.FC<Props> = ({ children }) => {
  const [data, setData] = useState<AppParameters | undefined>();

  const fetchData = async () => {
    const response = await ParametersService.getParameters();
    setData(response);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const refetchData = () => {
    fetchData();
  };

  return (
    <ParameterContext.Provider value={{ data, refetchData }}>
      {children}
    </ParameterContext.Provider>
  );
};

export const useParametersContext = () => useContext(ParameterContext);

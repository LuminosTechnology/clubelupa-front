import api from "../config/api";
import { AppParameters } from "../types/api/parameters";

export const ParametersService = {
  getParameters: async () => {
    const response = await api.get<AppParameters>("/settings");
    return response.data;
  },
};

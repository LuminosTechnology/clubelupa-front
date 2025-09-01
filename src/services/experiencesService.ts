import api from "../config/api";
import { PaginatedResponse } from "../types/api/api";
import { Experience } from "../types/api/experiences";

export const ExperienceService = {
  getExperiences: async () => {
    const params: Record<string, string> = {};
    params["include"] = "establishment,category";
    const response = await api.get<PaginatedResponse<Experience[]>>(
      "/experiences",
      { params }
    );
    return response.data.data;
  },
  getExperience: async (id: number) => {
    const response = await api.get<{ data: Experience }>("/experiences/" + id);
    return response.data.data;
  },
};

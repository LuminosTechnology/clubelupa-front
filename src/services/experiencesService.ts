import api from "../config/api";
import { PaginatedResponse } from "../types/api/api";
import { Experience, ExperienceHistory, RedeemExperienceResponse } from "../types/api/experiences";

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
  getExperiencesByUser: async () => {
    const response = await api.get<PaginatedResponse<ExperienceHistory[]>>(
      "/user/experiences/redemptions"
    );
    return response.data.data;
  },
  redeemExperience: async (experience_id: number): Promise<RedeemExperienceResponse> => {
    const response = await api.post<RedeemExperienceResponse>(
      `/user/experiences/${experience_id}/redeem`
    );
    return response.data;
  },
};

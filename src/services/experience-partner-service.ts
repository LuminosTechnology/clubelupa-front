// src/services/experience-service.ts

import api from "../config/api";
import { PaginatedResponse } from "../types/api/api";
import { ExperienceRedemption } from "../types/api/affiliateExperience"; // Reutilizaremos o tipo da outra página

/**
 * Retorna as experiências que o usuário resgatou mas ainda não utilizou.
 * API: GET /api/v1/user/experiences/to-use-redemptions
 */
export const getUserToUseRedemptions = async (): Promise<PaginatedResponse<ExperienceRedemption[]>> => {
  const { data } = await api.get('/user/experiences/to-use-redemptions');
  debugger;
  return data;
};

/**
 * Retorna o histórico de experiências que o usuário já utilizou.
 * API: GET /api/v1/user/experiences/redemptions
 */
export const getUserRedeemed = async (): Promise<PaginatedResponse<ExperienceRedemption[]>> => {
  const { data } = await api.get('/user/experiences/redemptions');
  return data;
};

// Juntando em um objeto para facilitar a importação
export const ExperienceService = {
  getUserToUseRedemptions,
  getUserRedeemed,
};
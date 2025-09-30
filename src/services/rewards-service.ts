import api from "../config/api";
import { RewardsApiResponse } from "../types/api/rewards";

export interface TransactionGamificationResponse {
    status: number,
    message: string,
    data: {
        transaction_id: string
    }
}

export const getGamificationRewards = async (transactionId: string) => {
    transactionId = '3c2eb80a-9a33-4c24-b272-c1ce5ef9b12d';
  const response = await api.get<{ data: RewardsApiResponse }>(`/user/gamification-results/${transactionId}`);
  return response;
};
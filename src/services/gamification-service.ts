import api from "../config/api";
import { GamificationResultResponse } from "../types/api/user";

export class GamificationService {
  private static readonly POLLING_INTERVAL = 2000; // 2 segundos
  private static readonly MAX_ATTEMPTS = 30; // 30 tentativas (1 minuto)

  /**
   * Busca o resultado da gamificação para um transaction_id específico
   */
  static async getGamificationResult(transactionId: string): Promise<GamificationResultResponse> {
    const response = await api.get<GamificationResultResponse>(
      `/user/gamification-results/${transactionId}`
    );
    return response.data;
  }

  /**
   * Aguarda o resultado da gamificação até que o status seja "completed" ou "failed"
   * Implementa polling com timeout
   */
  static async waitForGamificationResult(
    transactionId: string,
    onProgress?: (status: string) => void
  ): Promise<GamificationResultResponse | null> {
    let attempts = 0;
    debugger
    while (attempts < this.MAX_ATTEMPTS) {
      try {
        const result = await this.getGamificationResult(transactionId);
        
        if (onProgress) {
          onProgress(result.status);
        }

        if (result.status === "completed") {
          return result;
        }

        if (result.status === "failed") {
          console.warn(`Gamification result failed for transaction ${transactionId}`);
          return null;
        }

        // Se ainda está pending ou processing, aguarda e tenta novamente
        await new Promise(resolve => setTimeout(resolve, this.POLLING_INTERVAL));
        attempts++;
      } catch (error) {
        console.error(`Error polling gamification result for transaction ${transactionId}:`, error);
        attempts++;
        await new Promise(resolve => setTimeout(resolve, this.POLLING_INTERVAL));
      }
    }

    console.warn(`Timeout waiting for gamification result for transaction ${transactionId}`);
    return null;
  }

  /**
   * Processa o resultado da gamificação e retorna informações estruturadas
   */
  static processGamificationResult(result: GamificationResultResponse) {
    const { status, rewards } = result;
    
    if (status !== "completed") {
      return null;
    }

    return {
      hasRewards: rewards.points_earned > 0 || rewards.coins_earned > 0 || rewards.medals_earned.length > 0,
      hasLevelUp: rewards.level_up_info !== null,
      hasNewMedals: rewards.medals_earned.length > 0,
      hasCoins: rewards.coins_earned > 0,
      hasPoints: rewards.points_earned > 0,
      rewards
    };
  }
}

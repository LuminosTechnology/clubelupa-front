import axios from "axios";
import { getToken } from "../services/auth-service";
import { API_CONFIG } from "./constants";
import { GamificationService } from "../services/gamification-service";

// const API_URL =
//   "https://y57yu3j3k2.execute-api.sa-east-1.amazonaws.com/prod/api";
// const API_URL = "https://y57yu3j3k2.execute-api.sa-east-1.amazonaws.com/api/v1";
// const API_URL = "https://app.clubelupa.com.br/api/v1";

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Endpoints que podem gerar gamificação
const GAMIFICATION_ENDPOINTS = [
  '/checkin',
  '/purchases/scan',
  '/purchases/scan-barcode',
];

// Função para verificar se o endpoint deve processar gamificação
const shouldProcessGamification = (url: string): boolean => {
  return GAMIFICATION_ENDPOINTS.some(endpoint => 
    url.includes(endpoint)
  );
};

// Interceptor de resposta para capturar transaction_id e processar gamificação
api.interceptors.response.use(
  async (response) => {
    const url = response.config.url || '';
    const transactionId = response.data?.transaction_id;
    console.log({ url, transactionId });
    // Só processa gamificação para endpoints específicos
    if (shouldProcessGamification(url) && transactionId && response.status >= 200 && response.status < 300) {
      console.log(`Gamification endpoint detected: ${url}`);
      console.log(`Transaction ID found: ${transactionId}`);
      
      // Processa a gamificação em background sem bloquear a resposta
      GamificationService.waitForGamificationResult(transactionId, (status) => {
        console.log(`Gamification status for transaction ${transactionId}: ${status}`);
      }).then((result) => {
        if (result) {
          const processedResult = GamificationService.processGamificationResult(result);
          if (processedResult && processedResult.hasRewards) {
            console.log('🎉 Gamification rewards detected:', processedResult.rewards);
            // Emite evento customizado para notificar o contexto
            window.dispatchEvent(new CustomEvent('gamification-rewards', {
              detail: processedResult
            }));
          }
        }
      }).catch((error) => {
        console.error('Error processing gamification result:', error);
      });
    }
    
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

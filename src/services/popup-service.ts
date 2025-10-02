import api from "../config/api";

// Tipo para a resposta da API
export interface PopupData {
    id: number;
    image_url: string;
    establishment_id: number;
}

// O serviço que busca o próximo pop-up
export const PopupService = {
    getNextPopup: async (): Promise<{ data: PopupData } | null> => {
        try {
            const response = await api.get<{ data: PopupData }>("/user/popups/next");
            // Se a resposta for bem-sucedida mas não houver conteúdo (ex: status 204),
            // ou se 'data' for nulo, a biblioteca pode retornar null/undefined.
            // A verificação `response.data?.data` garante que o pop-up existe.
            if (response.data?.data) {
                return response.data;
            }
            return null;
        } catch (error: any) {
            // Se o backend retornar 404 (Not Found), significa que não há pop-up.
            // Isso não é um erro, então retornamos null silenciosamente.
            if (error.response && error.response.status === 404) {
                return null;
            }
            // Para outros erros (rede, etc.), registramos no console.
            console.error("Erro ao buscar pop-up:", error);
            return null;
        }
    }
};
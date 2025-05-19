// src/services/favoritesService.ts
import api from "./api";
import { getToken } from "./auth-service";
import { AffiliateData } from "./interfaces/Affiliate";

export interface FavoriteStore extends AffiliateData {
  id: number;
  profile_photo?: string;
}

const withAuth = async () => {
  const token = await getToken();
  return { headers: { Authorization: `Bearer ${token}` } };
};

/**
 * Lista os afiliados favoritados pelo usuário.
 * Aceita qualquer formato de resposta do back-end e garante
 * que sempre devolvemos um array.
 */
export const getFavorites = async (): Promise<FavoriteStore[]> => {
  const opts = await withAuth();
  const resp = await api.get("/affiliates/favorites", opts);
  const data = resp.data;

  if (Array.isArray(data)) return data;

  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.favorites)) return data.favorites;

  console.warn("[favoritesService] Formato inesperado:", data);
  return [];
};

/**
 * Marca um afiliado como favorito.
 */
export const addFavorite = async (affiliateId: number): Promise<void> => {
  const opts = await withAuth();
  await api.post(`/affiliates/${affiliateId}/favorite`, {}, opts);
};

/**
 * Remove um afiliado dos favoritos.
 */
export const removeFavorite = async (affiliateId: number): Promise<void> => {
  const opts = await withAuth();
  await api.delete(`/affiliates/${affiliateId}/favorite`, opts);
};

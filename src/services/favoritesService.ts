import api from "../config/api";
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

export const addFavorite = async (affiliateId: number): Promise<void> => {
  const opts = await withAuth();
  await api.post(`/affiliates/${affiliateId}/favorite`, {}, opts);
};

export const removeFavorite = async (affiliateId: number): Promise<void> => {
  const opts = await withAuth();
  await api.delete(`/affiliates/${affiliateId}/favorite`, opts);
};

import { escape } from "querystring";
import { Establishment, PaginatedResponse } from "../types/api/api";
import api from "../config/api";
import { getToken } from "./auth-service";
import { AffiliateData } from "./interfaces/Affiliate";
import { AdvertisementData } from "../types/api/affiliate";

/** Retorna o primeiro afiliado associado ao token ou null. */
export const getMyFirstAffiliate = async (): Promise<AffiliateData | null> => {
  const token = await getToken();
  const { data } = await api.get("/affiliates", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const list: AffiliateData[] = Array.isArray(data)
    ? data
    : Array.isArray((data as any)?.affiliates)
    ? (data as any).affiliates
    : [];

  return list.length ? list[0] : null;
};

export const getAllEstablishments = async (search?: string | null) => {
  let params: Record<string, string> = {};
  if (!!search) params["filter[Search]"] = search;

  const response = await api.get<PaginatedResponse<Establishment[]>>(
    "/establishments",
    {
      params,
    }
  );
  return response.data;
};

export const getAffiliateById = async (
  id: string | number
): Promise<AffiliateData> => {
  const { data } = await api.get<AffiliateData>(`/affiliates/${id}`);
  return data;
};

export const updateAffiliate = async (
  id: string | number,
  payload: AffiliateData
): Promise<AffiliateData> => {
  const { data } = await api.put<AffiliateData>(`/afiliados/${id}`, payload);
  return data;
};

export const uploadAffiliatePhoto = async (
  id: string | number,
  file: File
): Promise<{ url: string }> => {
  const formData = new FormData();
  formData.append("foto_perfil", file);

  const { data } = await api.post<{ url: string }>(
    `/afiliados/${id}/upload-foto`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return data;
};

export const fetchMyEstablishmentData = async (id: number) => {
  const response = await api.get<Establishment>("/my-establishments/" + id);
  return response.data;
};

export const fetchSingleEstablishmentData = async (id: number) => {
  const response = await api.get<{ data: Establishment }>(
    `/establishments/${id}`
  );
  return response.data;
};

export const toggleFavorite = async (id: number) => {
  const response = await api.post(`/establishments/${id}/toggle-favorite`);
  return response.data;
};

export const fetchFavorites = async ({ query }: { query?: string }) => {
  let params: Record<string, string> = {};
  if (!!query) params["filter[Search]"] = query;
  const response = await api.get<PaginatedResponse<Establishment[]>>(
    `/user/favorites/establishments`,
    {
      params,
    }
  );
  return response.data;
};

export const doCheckIn = async (id: number) => {
  const response = await api.post(`/establishments/${id}/checkin`);
  return response.data;
};

export const getAdvertisingProducts = async () => {
  const response = await api.get<{ data: AdvertisementData[] }>(`/products`);
  return response.data;
};

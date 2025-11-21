import { escape } from "querystring";
import { Establishment, PaginatedResponse } from "../types/api/api";
import api from "../config/api";
import { getToken } from "./auth-service";
import { AffiliateData } from "./interfaces/Affiliate";
import {
  AdvertisementData,
  BecomeAnAffiliateRequest,
} from "../types/api/affiliate";
import { ExperienceRedemption } from '../types/api/affiliateExperience';



/**
 * Retorna a lista de vouchers de experiência que foram resgatados pelos sócios,
 * mas ainda não foram utilizados no estabelecimento.
 * API: GET /api/v1/establishment/experiences/to-use-redemptions
 */
export const getToUseRedemptions = async (): Promise<PaginatedResponse<ExperienceRedemption[]>> => {
  const { data } = await api.get('/establishment/experiences/to-use-redemptions');
  return data;
};

/**
 * Retorna a lista de vouchers de experiência que já foram utilizados no estabelecimento.
 * API: GET /api/v1/establishment/experiences/redemptions
 */
export const getRedeemed = async (): Promise<PaginatedResponse<ExperienceRedemption[]>> => {
  const { data } = await api.get('/establishment/experiences/redemptions');
  return data;
};

/**
 * Marca um voucher como utilizado, a partir do código localizador fornecido pelo sócio.
 * API: PATCH /api/v1/establishment/experience-redemptions/by-code/{redemption_code}/mark-used
 * @param redemptionCode O código do voucher a ser validado.
 */
export const markRedemptionAsUsed = async (redemptionCode: string): Promise<ExperienceRedemption> => {
  const { data } = await api.patch(
    `/establishment/experience-redemptions/by-code/${redemptionCode}/mark-used`
  );
  return data; // A API retorna o objeto atualizado
};



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

export const getAllEstablishments = async (
  search?: string | null,
  categories?: number[]
) => {
  let params: Record<string, string> = {};
  if (!!search) params["filter[Search]"] = search;
  params.sort = "name";

  if (categories && categories.length > 0) {
    params["filter[categories]"] = categories.join(",");
  }

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

interface CheckinDistanceMeters {
  max_checkin_distance_meters: number;
}

export const getCheckinDistanceMeters = async () => {
  const response = await api.get< CheckinDistanceMeters >(
    `/settings`
  );
  return Number(response.data.max_checkin_distance_meters);
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

export const fetchFavorites = async ({
  query,
  categories,
}: {
  query?: string;
  categories?: number[];
}) => {
  let params: Record<string, string> = {};
  if (!!query) params["filter[Search]"] = query;
  params.sort = "name";
  if (categories && categories.length > 0) {
    params["filter[categories]"] = categories.join(",");
  }
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

export const becomeAnAffiliate = async (data: BecomeAnAffiliateRequest) => {
  const response = await api.post("/establishments", data);
  return response.data;
};

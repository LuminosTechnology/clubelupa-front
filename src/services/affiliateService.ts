import api from "./api";
import { AffiliateData } from "./interfaces/Affiliate";
import { getToken } from "./auth-service";


const withAuth = async () => ({
  headers: { Authorization: `Bearer ${await getToken()}` },
});

/** Retorna o primeiro afiliado associado ao token ou null. */
export const getMyFirstAffiliate = async (): Promise<AffiliateData | null> => {
  const { data } = await api.get(
    "/affiliates",
    await withAuth(),          
  );

  const list: AffiliateData[] = Array.isArray(data)
    ? data
    : Array.isArray((data as any)?.affiliates)
    ? (data as any).affiliates
    : [];


  return list.length ? list[0] : null;
};

export const getAllAffiliates = async (): Promise<AffiliateData[]> => {
  const { data } = await api.get<{ affiliates: AffiliateData[] }>(
    "/affiliates"
  );
  return data.affiliates;
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

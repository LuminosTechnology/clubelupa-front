import api from "./api";
import { AffiliateData } from "./interfaces/Affiliate";

/**
 * Atualiza os dados do afiliado via PUT /api/afiliados/{id}
 */
export const updateAffiliate = async (
  id: string | number,
  data: AffiliateData
): Promise<AffiliateData> => {
  const response = await api.put<AffiliateData>(
    `/api/afiliados/${id}`,
    data
  );
  return response.data;
};

/**
 * Envia a foto de perfil via multipart/form-data para POST /api/afiliados/{id}/upload-foto
 */
export const uploadAffiliatePhoto = async (
  id: string | number,
  file: File
): Promise<any> => {
  const formData = new FormData();
  formData.append("foto_perfil", file);

  const response = await api.post(
    `/api/afiliados/${id}/upload-foto`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

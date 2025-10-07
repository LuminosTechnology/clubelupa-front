import api from "../config/api";
import { getToken } from "./auth-service";

export interface InvoiceUploadRequest {
  establishment_id: number;
  invoice_file: File;
}

export interface MediaItem {
  id: number;
  model_type: string;
  model_id: number;
  uuid: string;
  collection_name: string;
  name: string;
  file_name: string;
  mime_type: string;
  disk: string;
  conversions_disk: string;
  size: number;
  manipulations: any[];
  custom_properties: any[];
  generated_conversions: any[];
  responsive_images: any[];
  order_column: number;
  created_at: string;
  updated_at: string;
  original_url: string;
  preview_url: string;
}

export interface InvoiceUploadResponse {
  message: string;
  data: {
    user_id: number;
    establishment_id: string;
    status: string;
    updated_at: string;
    created_at: string;
    id: number;
    invoice_file_url: string;
    media: MediaItem[];
  };
}

export interface InvoiceUploadError {
  message: string;
  errors: {
    establishment_id?: string[];
    invoice_file?: string[];
  };
}

export const uploadInvoice = async (
  request: InvoiceUploadRequest
): Promise<InvoiceUploadResponse> => {
  const token = await getToken();
  
  const formData = new FormData();
  formData.append("establishment_id", request.establishment_id.toString());
  formData.append("invoice_file", request.invoice_file);

  const response = await api.post("/purchases/invoice-upload", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

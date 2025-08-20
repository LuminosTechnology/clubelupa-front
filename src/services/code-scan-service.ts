import api from "../config/api";
import {
  ScanPurchaseCodeRequest,
  ScanPurchaseCodeResponse,
} from "../types/api/affiliate";

export const CodeScannerService = {
  scanPurchaseCode: async ({
    establishment_id,
    qr_code_url,
  }: ScanPurchaseCodeRequest) => {
    const response = await api.post<ScanPurchaseCodeResponse>(
      `/purchases/scan`,
      {
        establishment_id,
        qr_code_url,
      }
    );
    return response.data;
  },
};

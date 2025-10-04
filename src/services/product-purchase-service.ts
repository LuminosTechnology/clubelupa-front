import api from "../config/api";

export interface ProductPurchaseRequest {
  product_id: number;
}

export interface ProductPurchaseResponse {
  message: string;
  data: {
    user_id: number;
    establishment_id: number;
    product_id: number;
    product_price: string;
    user_notes: string;
    status: string;
    updated_at: string;
    created_at: string;
    id: number;
    status_text: string;
    popup_image_url: string | null;
    media: any[];
  };
}

export const ProductPurchaseService = {
  purchaseProduct: async (productId: number): Promise<ProductPurchaseResponse> => {
    const response = await api.post<ProductPurchaseResponse>(
      "/products-purchase-requests",
      { product_id: productId }
    );
    return response.data;
  },
};

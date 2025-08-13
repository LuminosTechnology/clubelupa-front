import { PaginatedResponse } from "../types/api/api";
import { Category } from "../types/api/category";
import api from "../config/api";

export const CategoryService = {
  getCategories: async () => {
    const response = await api.get<PaginatedResponse<Category[]>>(
      "/establishment-categories/selection"
    );

    return response.data;
  },
};

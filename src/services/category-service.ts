import { PaginatedResponse } from "../types/api/api";
import { Category, CategoryTreeNode } from "../types/api/category";
import api from "../config/api";

export const CategoryService = {
  getCategories: async () => {
    const response = await api.get<PaginatedResponse<Category[]>>(
      "/establishment-categories/selection"
    );

    return response.data;
  },

  getCategoriesTree: async () => {
    const response = await api.get<{ data: CategoryTreeNode[] }>(
      "/establishment-categories/tree"
    );
    return response.data;
  },
};

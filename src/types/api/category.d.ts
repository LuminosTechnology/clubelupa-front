import { FormattedDate } from "./api";

export interface Category {
  id: number;
  parent_id: number | null;
  name: string;
  name_translated: string;
  slug: string;
  description: string | null;
  color: string;
  icon_url: string;
  icon_highlight_url: string;
  original_locale: string | null;
  is_active: boolean;
  is_active_text: string;
  parent_id?: number;
  created_at: FormattedDate;
  updated_at: FormattedDate;
  deleted_at: string | null;
}

export interface Attribute {
  id: number;
  name: string;
  created_at: FormattedDate;
  updated_at: FormattedDate;
  deleted_at: FormattedDate | null;
}
export interface CategoryTreeNode extends Category {
  children: CategoryTreeNode[];
  attributes: Attribute[];
}

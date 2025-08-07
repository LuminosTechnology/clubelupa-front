import { FormattedDate } from "./api";

export interface Category {
  id: number;
  parent_id: number | null;
  name: string;
  name_translated: string;
  slug: string;
  description: string | null;
  color: string;
  original_locale: string | null;
  is_active: boolean;
  is_active_text: string;
  created_at: FormattedDate;
  updated_at: FormattedDate;
  deleted_at: string | null;
}

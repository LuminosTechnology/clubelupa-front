import { Establishment, FormattedDate } from "./api";
import { Category } from "./category";

export type Experience = {
  id: number;
  title: string;
  description: string;
  establishment_id: number;
  establishment_name: string;
  category_id: number;
  cost_in_coins: number;
  cost_value: number;
  rescue_value: number;
  is_active: boolean;
  is_active_text: string;
  redeemed_count: number;
  has_redeemed: boolean;
  can_redeem: boolean;
  image_url?: string;

  establishment?: Establishment;
  category?: Category;

  created_at: FormattedDate;
  updated_at: FormattedDate;
  deleted_at?: FormattedDate;
};

export type ExperienceHistory = {     
  id: number,
  experience_name: string;
  establishment_name: string;
  cost_in_coins: number;
  redeemed_at: FormattedDate;
  short: string;
  short_with_time: string;
  human: string;
  }

  export interface RedeemExperienceRequest {
    experience_id: number;
  }
  
  export interface RedeemExperienceResponse {
    message: string;
    data: any;
  }
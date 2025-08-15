import { CreateAddress, FormattedDate } from "./api";

export interface RegisterUserRequest {
  name: string;
  email: string;
  birth_date: string;
  phone_number: string;
  password: string;
  password_confirmation: string;
  avatar?: File;
}

export interface UpdateUserRequest extends Partial<RegisterUserRequest> {
  address?: Partial<CreateAddress>;
}

export interface Medal {
  id: number;
  name: string;
  description: string;
  bonus_points_awarded: number;
  bonus_coins_awarded: number;
  icon_url: string;
  is_active: boolean;
  is_active_text: string;
  created_at: FormattedDate;
  updated_at: FormattedDate;
  deleted_at: FormattedDate;
  required_level_id: number;
}

export interface CurrentLevel {
  number: number;
  name: string;
  progress_percentage: number;
}

export interface GamificationSummaryResponse {
  visited_establishments_count: number;
  current_level: CurrentLevel;
  points_balance: number;
  points_for_next_level: number;
  next_level_name: string;
  coins_balance: number;
  medals_count: number;
  medals: Medal[];
  days_as_member: string;
}

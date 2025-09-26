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
  containsMedal?: boolean;
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
  does_not_have_medals: Medal[];
  days_as_member: string;
}

export interface GamificationReward {
  coins_earned: number;
  level_up_info: LevelUpInfo | null;
  medals_earned: MedalEarned[];
  points_earned: number;
}

export interface LevelUpInfo {
  type: "level_up";
  new_level: number;
  old_level: number;
  new_level_name: string;
}

export interface MedalEarned {
  id: number;
  name: string;
  type: "medal";
  icon_url: string;
}

export interface GamificationResult {
  status: "pending" | "processing" | "completed" | "failed";
  rewards: GamificationReward;
}

export interface GamificationResultResponse {
  data: GamificationResult;
}
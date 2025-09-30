
interface Medal {
  id: number;
  name: string;
  type: 'medal';
  icon_url: string;
}

interface LevelUpInfo {
  type: 'level_up';
  new_level: number;
  old_level: number;
  new_level_name: string;
}

export interface RewardsApiResponse {
  coins_earned: number;
  level_up_info: LevelUpInfo | null;
  medals_earned: Medal[];
  points_earned: number;
}

export type RewardItem = 
  | { type: 'points'; data: { amount: number } }
  | { type: 'coins'; data: { amount: number } }
  | { type: 'medal'; data: Medal }
  | { type: 'level_up'; data: LevelUpInfo };
export interface AppParameters {
  platform_name: string;
  contact_info: {
    email: string;
    whatsapp: string;
  };
  social_links: {
    instagram: string;
    landing_page: string;
  };
  physical_address: string | null;
  checkin_cooldown_minutes: number;
  max_checkin_distance_meters: number;
  free_user_max_level: number;
  logo_web_url: string;
  logo_mobile_url: string;
}

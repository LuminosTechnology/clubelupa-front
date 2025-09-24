import { CategoryTreeNode } from "./category";

export interface User {
  id: number;
  name: string;
  email: string;
  avatar_url?: string;

  created_at?: FormattedDate;
  updated_at?: FormattedDate;
  deleted_at?: FormattedDate;
  email_verified_at?: FormattedDate;

  username?: string;
  nickname?: string;
  phone_number?: string;
  birth_date?: FormattedDate;
  is_active: boolean;
  is_active_text: string;

  addresses: Address[];
  establishments?: Establishment[];

  can: string[];
  roles: Role[];
  is_affiliate: boolean;
  is_payed: boolean;

  subscription?: {
    created_at: FormattedDate;
    expires_at: FormattedDate;
    id: number;
    product_id: number;
    provider: string;
    provider_subscription_id: string;
    status: "active" | string;
    user_id: number;
  }[];
}

export type FlashMessage = {
  message?: string;
};

export interface Crumb {
  label: string;
  url?: string;
}
export type Theme = "light" | "dark";

// Interface para o objeto de data formatado que o Trait nos envia
export interface FormattedDate {
  default: string;
  short: string;
  short_with_time: string;
  human: string;
}

export interface ModelDefinition {
  name: string;
  version: string;
  attributes_count: number;
  relations_count: number;
  updated_at: string;
}

// Em resources/js/types/index.d.ts
// ...
export interface DashboardStats {
  pendingEstablishments: number;
  totalMembers: number;
  totalEstablishments: number;
}
// Interface para o nosso modelo de Permissão
export interface Permission {
  id: number;
  name: string;
  created_at?: FormattedDate;
  roles: Role[];
  roles_count: number;
}
export interface Role {
  id: number;
  name: string;
  created_at?: FormattedDate;
  permissions: Permission[];
  permissions_count: number;
}

export interface Address {
  id: number;
  addressable_id: number;
  addressable_type: string;
  type: string;
  zip_code: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  is_active: boolean;
  is_active_text: string;
  created_at: FormattedDate;
  updated_at: FormattedDate;
  deleted_at: FormattedDate;
}

export interface CreateAddress {
  type: string;
  zip_code: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  complement?: string;
  latitude?: number;
  longitude?: number;
}

export interface Level {
  id: number;
  level_number: number;
  name: string;
  points_required: number;
  reward_points: number;
  reward_coins: number;
  is_premium_only: boolean;
}

export interface EstablishmentCategory {
  id: number;
  parent_id?: number;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon_url?: string;
  parent_id?: number;
  children?: EstablishmentCategory[]; // Uma categoria pode ter uma lista de subcategorias
}

export interface Establishment {
  id: number;
  name: string;
  legal_name?: string;
  description?: string;
  document_number?: string;
  company_age?: string;
  business_model?: string;
  email?: string;
  phone_number?: string;
  whatsapp_number?: string;

  social_links: {
    site?: string;
    instagram?: string;
  };

  opening_hours: Record<string, string[]>;

  status_open: string;
  status_open_details: {
    status_open: string;
    message: string;
  };

  structure_type: number; // 1 = física, 2 = física e online, 3 = online
  structure_type_text: string;

  is_active: boolean;
  is_favorited_by_me: boolean;
  is_checked_in_by_me_last_hour: boolean;
  is_checked_in_by_me_last_hour: boolean;
  has_ever_been_checked_in_by_me: boolean;

  can_has_checkin: boolean;
  can_has_purchase: boolean;

  checkins_count: number;

  approved_status: string;
  approved_status_text: string;

  // Relações
  owner: User;
  addresses: Address[];
  categories: CategoryTreeNode[];
  attributes: Atributes[];

  has_appointment: boolean;

  social_links:
    | {
        site: string;
        instagram: string;
      }
    | [];

  shop_photo_url?: string;
  product_photo_url?: string;
  behind_the_scenes_photo_url?: string;
  created_at?: FormattedDate;
  approved_status_date?: {
    default: string;
    short: string;
    short_with_time: string;
    human: string;
  };
}

export interface QueryParams {
  sort?: string;
  filter?: Record<string, any>;
  per_page?: string;
}
// Interface GENÉRICA para a resposta de paginação do Laravel.
// Podemos reutilizar isso para Projetos, Usuários, etc.
export interface Paginated<T> {
  data: T[];
  links: {
    first?: string;
    last?: string;
    prev?: string;
    next?: string;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
    links: { url?: string; label: string; active: boolean }[];
  };
}

export interface PaginatedResponse<T> {
  data: T;
  links: {
    first?: string;
    last?: string;
    prev?: string;
    next?: string;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: {
      url?: string;
      label: string;
      active: boolean;
    }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

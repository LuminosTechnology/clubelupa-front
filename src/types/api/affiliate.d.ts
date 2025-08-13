import { Address, CreateAddress, FormattedDate } from "./api";

export interface RegisterAffiliateRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  birth_date: string;
  // avatar: File; // Não tem upload de avatar na hora de registar
  phone_number: string;
  establishment_name: string;
  category_id: number;
  instagram?: string;
  site?: string;

  address?: {
    zip_code?: string;
    street?: string;
    number?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
    complement?: string;
    latitude?: number;
    longitude?: number;
  };

  auto_approve_code?: string;
}

export interface UpdateAffiliateEstablishmentRequest {
  name?: string;
  legal_name?: string;
  description?: string;
  document_number?: string /**CNPJ */;
  company_age?: string;
  business_model?: string;

  email?: string;
  phone_number?: string;
  whatsapp_number?: string;

  category_id?: number;

  address: Partial<CreateAddress>;

  instagram?: string;
  site?: string;

  shop_photo?: File;
  product_photo?: File;
  behind_the_scenes_photo?: File;
}

export interface AdvertisementData {
  id: number;
  name: string;
  description: string;
  image_url: string;
  price: number;
  is_active: boolean;
  is_active_text: string;
  created_at: FormattedDate;
  updated_at: FormattedDate;
  deleted_at?: FormattedDate;
}

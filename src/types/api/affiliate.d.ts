import {
  DayValue,
  TimePair,
} from "../../pages/AffiliateEdit/components/OpeningHoursForm";
import { Address, CreateAddress, Establishment, FormattedDate } from "./api";

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
  categories?: number[];

  attributes?: number[];

  address?: Partial<CreateAddress>;

  has_appointment: boolean;

  shop_photo?: File;
  product_photo?: File;
  behind_the_scenes_photo?: File;

  opening_hours?: Record<DayValue, string[]>;

  instagram?: string;
  site?: string;
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

export interface BecomeAnAffiliateRequest {
  name: string;
  site: string;
  instagram: string;
  categories: string[];
  address?: Partial<{
    zip_code: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    complement: string;
    latitude: number;
    longitude: number;
  }>;
}

export interface ScanPurchaseCodeRequest {
  qr_code_url: string;
  establishment_id: number;
}

export interface NotaFiscal {
  user_id: number;
  establishment_id: string;
  chave_nfe: string;
  data_emissao: string; // ISO datetime
  valor_total: number;
  updated_at: string; // ISO datetime
  created_at: string; // ISO datetime
  id: number;
  establishment: Establishment;
}

export interface ScanPurchaseCodeResponse {
  message: string;
  nota: NotaFiscal;
  cnpj_emitente: string;
}

// src/types/api/experience.ts

import { FormattedDate } from "./api"; // Supondo que você já tenha FormattedDate em outro lugar

// Se não tiver, pode definir aqui:
// export interface FormattedDate {
//   default: string;
//   short: string;
//   short_with_time: string;
//   human: string;
// }

// Informações do usuário que resgatou a experiência
export interface RedemptionUser {
  id: number;
  name: string;
  email: string;
  phone_number: string;
}

// A estrutura principal do objeto de resgate (voucher)
export interface ExperienceRedemption {
  id: number;
  experience_name: string;
  establishment_name: string;
  redemption_code?: string;
  cost_in_coins: number;
  redeemed_at: FormattedDate;
  used_at?: FormattedDate | null;
  user: RedemptionUser;
  // Adicione outros campos se precisar exibi-los
}

interface Redemption {
  id: number;
  experience_name: string;
  redemption_code?: string;
  redeemed_at: { short: string };
  used_at?: { short_with_time: string } | null;
  user: {
    name: string;
    email: string;
    phone_number: string;
  };
}
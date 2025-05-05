// src/services/interfaces/Auth.ts
export interface User {
  id: number;
  nome_completo: string;
  data_nascimento: string;
  telefone: string;
  celular: string | null;
  cpf: string;
  cep: string;
  rua: string;
  bairro: string | null;
  cidade: string | null;
  uf: string | null;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  profile_photo?: string;   // URL da foto vinda da API
  avatar_url?: string;      // opcional, manter para compatibilidade
}

export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
  message: string;
  user: User & { email_verified_at: null | string };
  role: string;
}

export interface ForgotPasswordRequest {
  email: string;
  data_nascimento: string;
}

export interface ResetPasswordRequest {
  email: string;
  code: string;
  password: string;
  password_confirmation: string;
}

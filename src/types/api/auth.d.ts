import { Address } from "./api";

export interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  // avatar: File; // Não tem upload de avatar na hora de registar
}

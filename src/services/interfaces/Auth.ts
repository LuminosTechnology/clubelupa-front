// src/services/interfaces/Auth.ts

import { User } from "../../types/api/api";

export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  data: {
    token: string;
    user: User;
  };
  message: string;
  status: number;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordVerifyRequest {
  email: string;
  code: string;
  password: string;
  password_confirmation: string;
}

export interface ResetPasswordRequest {
  email: string;
  code: string;
  password: string;
  password_confirmation: string;
}

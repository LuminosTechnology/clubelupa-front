export interface User {
    id: number;
    name: string;
    email: string;
    
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
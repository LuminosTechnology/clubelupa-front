import api from "./api";
import { Preferences } from "@capacitor/preferences";
import {
  ForgotPasswordRequest,
  LoginUserRequest,
  LoginUserResponse,
  ResetPasswordRequest,
  User,
} from "./interfaces/Auth";
import { CreateAffiliateRequest } from "../types/api/affiliate";

const AUTH_TOKEN_KEY = "auth_token";

export const login = async (data: LoginUserRequest) => {
  console.log("[Auth Service] Attempting login with data:", data);
  const response = await api.post<LoginUserResponse>("/login", data);
  console.log("[Auth Service] Received login response:", response.data);
  const token = response.data.access_token;
  console.log("[Auth Service] Storing token:", token);
  await Preferences.set({ key: AUTH_TOKEN_KEY, value: token });
  console.log("[Auth Service] Token stored successfully");
  return response.data;
};

export const verifyEmail = async ({
  email,
  code,
}: {
  email: string;
  code: string;
}) => {
  console.log("[Auth Service] Attempting email verification with data:", {
    email,
    code,
  });
  const response = await api.post("/verify", { email, code });
  console.log("[Auth Service] Email verification response:", response.data);
  return response.data;
};

export const register = async (data: any) => {
  console.log("[Auth Service] Attempting registration with data:", data);
  const response = await api.post("/register", data);
  console.log("[Auth Service] Registration response:", response.data);
  return response;
};

export const registerAffiliate = async (data: CreateAffiliateRequest) => {
  console.log(
    "[Auth Service] Attempting affiliate registration with data:",
    data
  );
  const response = await api.post("/afiliados/cadastro", data);
  console.log("[Auth Service] Registration response:", response.data);
  return response;
};

export const logout = async () => {
  console.log("[Auth Service] Attempting logout");
  const token = await getToken();
  if (!token) {
    console.error(
      "[Auth Service] Token not found, cannot proceed with logout."
    );
    return;
  }
  console.log("[Auth Service] Logging out with token:", token);
  const response = await api.post(
    "/logout",
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  console.log("[Auth Service] Logout response:", response.data);
  await Preferences.remove({ key: AUTH_TOKEN_KEY });
  console.log("[Auth Service] Token removed successfully, logout complete");
};

export const getToken = async () => {
  const token = await Preferences.get({ key: AUTH_TOKEN_KEY });
  console.log("[Auth Service] Retrieved token:", token.value);
  return token.value;
};

export const forgotPassword = async (data: ForgotPasswordRequest) => {
  console.log("[Auth Service] Requesting password reset code with data:", data);
  const response = await api.post("/forgot-password", data);
  console.log("[Auth Service] Password reset code response:", response.data);
  return response.data;
};

export const resetPassword = async (data: ResetPasswordRequest) => {
  console.log("[Auth Service] Resetting password with data:", data);
  const response = await api.post("/reset-password", data);
  console.log("[Auth Service] Password reset response:", response.data);
  return response.data;
};

export const getUserByToken = async (): Promise<User> => {
  const token = await getToken();
  if (!token) throw new Error("Token não encontrado");

  const response = await api.get<{ user: User }>("/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const user = response.data.user;
  return {
    ...user,
    avatar_url: user.profile_photo ?? user.avatar_url ?? "",
  };
};

export const updateUserProfile = async (
  userData: Partial<User>
): Promise<User> => {
  const token = await getToken();
  if (!token) throw new Error("Token não encontrado");
  const response = await api.put<{ user: User }>("/profile", userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.user;
};

export const updateProfilePhoto = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("profile_photo", file);

  const response = await api.post<{ profile_photo: string }>(
    "/profile/photo",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data.profile_photo;
};

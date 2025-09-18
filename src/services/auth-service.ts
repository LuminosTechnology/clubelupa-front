import { Preferences } from "@capacitor/preferences";
import { User } from "../types/api/api";
import api from "../config/api";
import {
  ForgotPasswordRequest,
  ForgotPasswordVerifyRequest,
  LoginUserRequest,
  LoginUserResponse,
  ResetPasswordRequest,
} from "./interfaces/Auth";
import {
  RegisterAffiliateRequest,
  UpdateAffiliateEstablishmentRequest,
} from "../types/api/affiliate";
import {
  GamificationSummaryResponse,
  RegisterUserRequest,
  UpdateUserRequest,
} from "../types/api/user";
import { LOCAL_STORAGE_KEYS } from "../config/constants";
import { ChangePasswordRequest } from "../types/api/auth";

export const login = async ({ email, password }: LoginUserRequest) => {
  const data = { email, password, device_name: "react-app" };
  const response = await api.post<LoginUserResponse>("/login", data);
  const token = response.data.data.token;
  await Preferences.set({ key: LOCAL_STORAGE_KEYS.AUTH_TOKEN, value: token });
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

export const register = async (data: RegisterUserRequest) => {
  const response = await api.post("/register", data);
  return response;
};

export const registerAffiliate = async (data: RegisterAffiliateRequest) => {
  const response = await api.post("/register/affiliate", data);
  return response;
};

export const updateEstablishment = async ({
  id,
  data,
}: {
  id: number;
  data: UpdateAffiliateEstablishmentRequest;
}) => {
  const formData = new FormData();


  if (data.name) formData.append("name", data.name);
  if (data.description) formData.append("description", data.description);
  if (data.business_model) formData.append("business_model", data.business_model);
  if (data.category_id !== undefined) formData.append("category_id", data.category_id.toString());
  if (data.instagram) formData.append("instagram", data.instagram);
  if (data.site) formData.append("site", data.site);

  formData.append("legal_name", data.legal_name ?? "");
  formData.append("document_number", data.document_number ?? "");
  formData.append("company_age", data.company_age ?? "");
  formData.append("email", data.email ?? "");
  formData.append("phone_number", data.phone_number ?? "");
  formData.append("whatsapp_number", data.whatsapp_number ?? "");
  
  if (data.categories) {
    data.categories.forEach((category) =>
      formData.append("categories[]", category.toString())
    );
  }  
  
  if (data.attributes && data.attributes.length > 0) {
    data.attributes.forEach((attribute) =>
      formData.append("attributes[]", attribute.toString())
    );
  }//else{ formData.append("attributes[]", ""); }

  //console.log(formData.get("attributes[]"));

  let isOpeningHours = false;

  if (data.opening_hours) {    

    for (const [key, value] of Object.entries(data.opening_hours)) {
    
      if (value && Array.isArray(value)) {
       
        value.forEach((hour) => {
          formData.append(`opening_hours[${key}][]`, hour);
        });       
        
        isOpeningHours = true;

      }

    }
  }

  if ( !isOpeningHours ) { formData.append(`opening_hours[][]`, ""); }


  if (data.address) {
    for (const [key, value] of Object.entries(data.address)) {
      if (value !== undefined && value !== null) {
        formData.append(`address[${key}]`, value.toString());
      }
    }
  }

  if (data.shop_photo) formData.append("shop_photo", data.shop_photo);
  if (data.product_photo) formData.append("product_photo", data.product_photo);
  if (data.behind_the_scenes_photo)
    formData.append("behind_the_scenes_photo", data.behind_the_scenes_photo);

  const response = await api.post(`/my-establishments/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
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
  const response = await api.post("/logout");

  console.log("[Auth Service] Token removed successfully, logout complete");
};

export const getToken = async () => {
  const token = await Preferences.get({ key: LOCAL_STORAGE_KEYS.AUTH_TOKEN });
  return token.value;
};

export const forgotPassword = async (data: ForgotPasswordRequest) => {
  console.log("[Auth Service] Requesting password reset code with data:", data);
  const response = await api.post<{ message: string }>(
    "/forgot-password",
    data
  );
  console.log("[Auth Service] Password reset code response:", response.data);
  return response.data;
};

export const forgotPasswordVerify = async (
  data: ForgotPasswordVerifyRequest
) => {
  const response = await api.post("/forgot-password/verify", data);
  return response.data;
};

export const resetPassword = async (data: ResetPasswordRequest) => {
  console.log("[Auth Service] Resetting password with data:", data);
  const response = await api.post("/reset-password", data);
  console.log("[Auth Service] Password reset response:", response.data);
  return response.data;
};

export const getUserByToken = async () => {
  const response = await api.get<User>("/user");
  return response.data;
};

export const updateUserProfile = async (userData: UpdateUserRequest) => {
  const formData = new FormData();
  console.log({ userData });
  if (userData.avatar) {
    formData.append("avatar", userData.avatar);
  }

  if (userData.name) {
    formData.append("name", userData.name);
  }
  if (userData.email) {
    formData.append("email", userData.email);
  }
  if (userData.birth_date) {
    formData.append("birth_date", userData.birth_date);
  }
  if (userData.phone_number) {
    formData.append("phone_number", userData.phone_number);
  }

  const response = await api.post("/user", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateProfilePhoto = async (file: File): Promise<string> => {
  throw new Error("Not implemented");
};

export const deleteAccount = async ({ password }: { password: string }) => {
  const response = await api.post(`/user/delete`, {
    password,
  });

  return response.data;
};

export const changePassword = async ({
  current_password,
  password,
  password_confirmation,
}: ChangePasswordRequest) => {
  const response = await api.post(`/user/change-password`, {
    current_password,
    password,
    password_confirmation,
  });
  return response.data;
};

export const getGamificationSummary = async () => {
  const response = await api.get<{ data: GamificationSummaryResponse }>(
    "/user/gamification-summary"
  );
  return response.data.data;
};

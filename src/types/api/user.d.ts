import { CreateAddress } from "./api";

export interface RegisterUserRequest {
  name: string;
  email: string;
  birth_date: string;
  phone_number: string;
  password: string;
  password_confirmation: string;
  avatar?: File;
}

export interface UpdateUserRequest extends Partial<RegisterUserRequest> {
  address?: Partial<CreateAddress>;
}

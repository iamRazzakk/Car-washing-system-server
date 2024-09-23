import { string } from "zod";

export type TUserLogin = {
  email: string;
  password: string;
  refreshToke?: string;
};
export type TChangePassoword = {
  email: string;
  oldPassword: string;
  newPassword: string;
};

export type TResponse = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  address: string;
};

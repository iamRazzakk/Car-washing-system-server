import { USER_ROLE } from "./singup.constance";

type userRole = "admin" | "user"
export type TSingUpUser = {
    name: string,
    email: string,
    password: string,
    phone: string,
    role: userRole,
    address: string,
    passwordCreatedAt?: Date
}
export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];
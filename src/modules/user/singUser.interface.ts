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
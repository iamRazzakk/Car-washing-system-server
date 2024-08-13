type userRole = "Admin" | "user"
export type TUser = {
    name: string,
    email: string,
    password: string,
    phone: string,
    role: userRole,
    address: string
} 
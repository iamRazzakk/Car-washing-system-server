import { z } from "zod";
export type UserRole = "admin" | "user";
const userValidationSchema = z.object(
    {
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email adress"),
        phone: z.string().min(10, "Phoen Number must be al Least 10 digis long").optional(),
        role: z.enum(["admin", "user"]),
        adress: z.string().min(1, "Address is required"),

    }
)
export const singUpValidationSchema = {
    userValidationSchema
}
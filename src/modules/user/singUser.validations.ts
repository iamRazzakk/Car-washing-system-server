import { z } from "zod";
export type UserRole = "ADMIN" | "USER";

const passwordSchema = z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string"
}).regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`])[A-Za-z\d!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]{8,}$/,
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
);

const createSignUpValidationSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Name is required",
            invalid_type_error: "Name is must be a string",
        }),
        email: z.string({
            required_error: "Email is required",
            invalid_type_error: "Email is must be a string",
        }),
        password: passwordSchema,
        phone: z.string({
            required_error: "Phone is required",
            invalid_type_error: "Phone is must be a string",
        }),
        role: z.string({
            required_error: "Role is required",
            invalid_type_error: "Role is must be a string",
        }).optional(),
        address: z.string({
            required_error: "Address is required",
            invalid_type_error: "Address is must be a string",
        }),
    }),
});

const updateUserRoleValidationSchema = z.object({
    body: z.object({
        role: z.enum(["ADMIN", "USER"], {
            required_error: "Role is required",
            invalid_type_error: "Role must be one of 'ADMIN' or 'USER'",
        }),
    }),
});

export const singUpValidationSchema = {
    createSignUpValidationSchema,
    updateUserRoleValidationSchema
}
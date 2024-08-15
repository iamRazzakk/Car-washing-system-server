import { z } from "zod";

const passwordValidationSchema = z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string"
}).regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`])[A-Za-z\d!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]{8,}$/,
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
);

const userLoginValidationSchema = z.object({
    body: z.object({
        email: z.string({
            required_error: "Email is required",
            invalid_type_error: "Invalid email",
        }).email("Invalid email format"),
        password: passwordValidationSchema,
    }),
});

const userChangePasswordValidationSchema = z.object({
    body: z.object({
        email: z.string({
            required_error: "Email is required",
            invalid_type_error: "Invalid email",
        }).email("Invalid email format"),
        oldPassword: passwordValidationSchema,
        newPassword: passwordValidationSchema,
    }),
});

const refreshTokenValidationSchema = z.object({
    body: z.object({
        refreshToken: z.string({
            required_error: "Refresh token is required",
            invalid_type_error: "Invalid refresh token",
        }),
    })
})

export const AuthValidationSchema = {
    userLoginValidationSchema,
    userChangePasswordValidationSchema,
    refreshTokenValidationSchema,
}

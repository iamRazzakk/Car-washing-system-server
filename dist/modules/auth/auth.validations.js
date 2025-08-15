"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidationSchema = void 0;
const zod_1 = require("zod");
const passwordValidationSchema = zod_1.z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string"
}).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`])[A-Za-z\d!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");
const userLoginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "Email is required",
            invalid_type_error: "Invalid email",
        }).email("Invalid email format"),
        password: passwordValidationSchema,
    }),
});
const userChangePasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "Email is required",
            invalid_type_error: "Invalid email",
        }).email("Invalid email format"),
        oldPassword: passwordValidationSchema,
        newPassword: passwordValidationSchema,
    }),
});
const editUserRoleSchema = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.enum(["USER", "ADMIN"], {
            required_error: "Role is required",
            invalid_type_error: "Invalid role type"
        }),
    }),
});
const refreshTokenValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: "Refresh token is required",
        }).nonempty("Refresh token cannot be empty"),
    }),
});
exports.AuthValidationSchema = {
    userLoginValidationSchema,
    userChangePasswordValidationSchema,
    refreshTokenValidationSchema,
    editUserRoleSchema
};

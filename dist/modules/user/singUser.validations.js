"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.singUpValidationSchema = void 0;
const zod_1 = require("zod");
const passwordSchema = zod_1.z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string"
}).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`])[A-Za-z\d!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");
const createSignUpValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
            invalid_type_error: "Name is must be a string",
        }),
        email: zod_1.z.string({
            required_error: "Email is required",
            invalid_type_error: "Email is must be a string",
        }),
        password: passwordSchema,
        phone: zod_1.z.string({
            required_error: "Phone is required",
            invalid_type_error: "Phone is must be a string",
        }),
        role: zod_1.z.string({
            required_error: "Role is required",
            invalid_type_error: "Role is must be a string",
        }),
        address: zod_1.z.string({
            required_error: "Address is required",
            invalid_type_error: "Address is must be a string",
        }),
    }),
});
exports.singUpValidationSchema = {
    createSignUpValidationSchema
};

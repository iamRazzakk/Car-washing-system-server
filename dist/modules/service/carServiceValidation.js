"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarServiceValidation = void 0;
const zod_1 = require("zod");
const createCarServiceValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Service name is required",
            invalid_type_error: "Service name must be string",
        }),
        description: zod_1.z.string({
            required_error: "Description is required",
            invalid_type_error: "Description must be string",
        }),
        price: zod_1.z.number({
            required_error: "Price is required and must be positive number",
            invalid_type_error: "Price is required and must be positive number",
        }),
        duration: zod_1.z.number({
            required_error: "Duration is required",
            invalid_type_error: "Duration must be number",
        }),
        isDeleted: zod_1.z
            .boolean({
            invalid_type_error: "isDeleted must be boolean",
        })
            .optional(),
    })
});
// Get Single car service form database
const updateCarServiceValidationSchema = zod_1.z.object({
    body: createCarServiceValidationSchema.partial(),
});
exports.CarServiceValidation = {
    createCarServiceValidationSchema,
    updateCarServiceValidationSchema
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarBookingValidation = void 0;
const zod_1 = require("zod");
const bookService_constance_1 = require("./bookService.constance");
const createCarServiceBookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        customer: zod_1.z
            .string({ invalid_type_error: "Customer ID must be a string" })
            .optional(),
        serviceId: zod_1.z
            .string({
            required_error: "Service ID is required",
            invalid_type_error: "Service ID must be a string",
        })
            .trim(),
        slotId: zod_1.z
            .string({
            required_error: "Slot ID is required",
            invalid_type_error: "Slot ID must be a string",
        })
            .trim(),
        vehicleType: zod_1.z.enum([...bookService_constance_1.vehicleTypeArray], {
            required_error: "Vehicle Type is required",
            invalid_type_error: "Invalid Vehicle Type",
        }),
        vehicleBrand: zod_1.z
            .string({
            required_error: "Vehicle brand is required",
            invalid_type_error: "Vehicle brand must be a string",
        })
            .trim(),
        vehicleModel: zod_1.z
            .string({
            required_error: "Vehicle model is required",
            invalid_type_error: "Vehicle model must be a string",
        })
            .trim(),
        manufacturingYear: zod_1.z.number({
            required_error: "Manufacturing year is required",
            invalid_type_error: "Manufacturing year must be a number",
        }),
        registrationPlate: zod_1.z
            .string({
            required_error: "Registration plate is required",
            invalid_type_error: "Registration plate must be a string",
        })
            .trim(),
    }),
});
const updateCarServiceBookingValidationSchema = zod_1.z.object({
    body: createCarServiceBookingValidationSchema.partial(),
});
exports.CarBookingValidation = {
    createCarServiceBookingValidationSchema,
    updateCarServiceBookingValidationSchema,
};

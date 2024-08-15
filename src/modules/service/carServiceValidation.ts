import { z } from "zod";


const createCarServiceValidationSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Service name is required",
            invalid_type_error: "Service name must be string",
        }),
        description: z.string({
            required_error: "Description is required",
            invalid_type_error: "Description must be string",
        }),
        price: z.number({
            required_error: "Price is required and must be positive number",
            invalid_type_error: "Price is required and must be positive number",
        }),
        duration: z.number({
            required_error: "Duration is required",
            invalid_type_error: "Duration must be number",
        }),
        isDeleted: z
            .boolean({
                invalid_type_error: "isDeleted must be boolean",
            })
            .optional(),
    })
});
// Get Single car service form database


export const CarServiceValidation = {
    createCarServiceValidationSchema,
};

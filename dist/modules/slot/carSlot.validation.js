"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carSloteValidationSchema = void 0;
const zod_1 = require("zod");
const Regex = /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;
const startTimeSchema = zod_1.z
    .string({
    required_error: "Start time is required",
    invalid_type_error: "Start time should be 'HH:MM' format",
})
    .refine((time) => {
    return Regex.test(time);
});
// for end time
const endTimeSchema = zod_1.z
    .string({
    required_error: "End time is required",
    invalid_type_error: "End time should be in 'HH:MM' format",
})
    .refine((time) => Regex.test(time), {
    message: "Invalid time format. Use 'HH:MM' format",
});
const serviceScheduleSchema = zod_1.z.object({
    body: zod_1.z.object({
        service: zod_1.z.string({
            required_error: "Service ID is Required",
            invalid_type_error: "Service id must be string"
        }),
        date: zod_1.z.string({
            required_error: "Date is required",
            invalid_type_error: "Date must be a string",
        }),
        startTime: startTimeSchema,
        endTime: endTimeSchema,
        isBooked: zod_1.z.enum(["available", "booked"]).optional(),
    })
});
exports.carSloteValidationSchema = {
    serviceScheduleSchema
};

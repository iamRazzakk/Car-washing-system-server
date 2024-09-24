import { z } from "zod";

const Regex = /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/; // Time format regex

const startTimeSchema = z
  .string({
    required_error: "Start time is required",
    invalid_type_error: "Start time should be in 'HH:MM' format",
  })
  .refine((time) => Regex.test(time), {
    message: "Invalid time format. Use 'HH:MM' format",
  });

const endTimeSchema = z
  .string({
    required_error: "End time is required",
    invalid_type_error: "End time should be in 'HH:MM' format",
  })
  .refine((time) => Regex.test(time), {
    message: "Invalid time format. Use 'HH:MM' format",
  });

const serviceScheduleSchema = z.object({
  body: z.object({
    service: z.string({
      required_error: "Service ID is required",
      invalid_type_error: "Service ID must be a string",
    }),
    date: z.string({
      required_error: "Date is required",
      invalid_type_error: "Date must be a string",
    }),
    startTime: startTimeSchema,
    endTime: endTimeSchema,
    isBooked: z.enum(["available", "booked", "canceled"]).optional(),
  }),
});
const updateSlotStatusSchema = z.object({
  body: z.object({
    status: z.enum(["available", "booked", "canceled"], {
      required_error: "Status is required",
      invalid_type_error: "Invalid status",
    }),
  }),
});


export const carSlotValidationSchema = {
  serviceScheduleSchema,
  updateSlotStatusSchema,
};

import { Types } from "mongoose";
import { TServiceSchedule } from "./carSlot.interface";
import { carSlotBookingSlot } from "./carSlot.model";

// Generates time slots
const generateTimeSlots = async (
    payload: TServiceSchedule,
    duration: number,
) => {
    // Check if startTime and endTime are defined
    if (!payload.startTime || !payload.endTime) {
        throw new Error("Start time and end time must be defined.");
    }

    // Initialize an empty array for storing slots
    const slots: { service: Types.ObjectId; date: string; startTime: string; endTime: string; }[] = [];

    // Convert time in "HH:MM" format to minutes
    const convertToMinutes = (time: string) => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    };

    // Convert minutes back to "HH:MM" format
    const formatTime = (minutes: number) => {
        const hours = String(Math.floor(minutes / 60)).padStart(2, "0");
        const mins = String(minutes % 60).padStart(2, "0");
        return `${hours}:${mins}`;
    };

    const totalStartTime = convertToMinutes(payload.startTime);
    const totalEndTime = convertToMinutes(payload.endTime);

    // Calculate total time
    const totalSlotTime = totalEndTime - totalStartTime;

    // Check if the total available time is less than the duration of a slot
    if (totalSlotTime < duration) {
        throw new Error("Duration exceeds the available time range.");
    }

    let currentTime = totalStartTime;

    while (currentTime + duration <= totalEndTime) {
        const startTime = formatTime(currentTime);
        const endTime = formatTime(currentTime + duration);

        // Check if a slot with the same service, date, and time exists
        const existingSlot = await carSlotBookingSlot.findOne({
            service: payload.service,
            date: payload.date,
            startTime,
            endTime,
        }).select('isBooked');

        // Check if existingSlot is defined and has a valid isBooked property
        if (existingSlot && typeof existingSlot.isBooked === 'string' && ["available", "canceled"].includes(existingSlot.isBooked)) {
            throw new Error(`This slot service at ${startTime} to ${endTime} is ${existingSlot.isBooked === "available" ? "already" : ""} ${existingSlot.isBooked}`);
        }

        slots.push({
            service: payload.service,
            date: payload.date,
            startTime,
            endTime,
        });

        currentTime += duration;
    }

    return slots;
};

export const GenerateTimeSlots = generateTimeSlots;

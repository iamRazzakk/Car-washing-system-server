import { TServiceSchedule } from "./carSlot.interface";
import { carSlotBookingSlot } from "./carSlot.model";

// Generates time slots
const generateTimeSlots = async (
    payload: TServiceSchedule,
    duration: number
) => {
    if (!payload.startTime || !payload.endTime) {
        throw new Error("Start time and end time must be defined.");
    }

    // Converts time in "HH:MM" format to minutes
    const convertToMinutes = (time: string) => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    };

    // Converts minutes back to "HH:MM" format
    const formatTime = (minutes: number) => {
        const hours = String(Math.floor(minutes / 60)).padStart(2, "0");
        const mins = String(minutes % 60).padStart(2, "0");
        return `${hours}:${mins}`;
    };

    const totalStartTime = convertToMinutes(payload.startTime);
    const totalEndTime = convertToMinutes(payload.endTime);

    if (totalEndTime - totalStartTime < duration) {
        throw new Error("Duration exceeds the available time range.");
    }

    let currentTime = totalStartTime;
    const slots = [];

    while (currentTime + duration <= totalEndTime) {
        const startTime = formatTime(currentTime);
        const endTime = formatTime(currentTime + duration);

        const existingSlot = await carSlotBookingSlot.findOne({
            service: payload.service,
            date: payload.date,
            startTime,
            endTime,
        }).select("isBooked");

        if (existingSlot && ["available", "canceled"].includes(existingSlot?.isBooked)) {
            throw new Error(`Slot from ${startTime} to ${endTime} is already ${existingSlot.isBooked}`);
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

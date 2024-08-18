"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateTimeSlots = void 0;
const carSlot_model_1 = require("./carSlot.model");
// Generates time slots
const generateTimeSlots = (payload, duration) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if startTime and endTime are defined
    if (!payload.startTime || !payload.endTime) {
        throw new Error("Start time and end time must be defined.");
    }
    // Initialize an empty array for storing slots
    const slots = [];
    // Convert time in "HH:MM" format to minutes
    const convertToMinutes = (time) => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    };
    // Convert minutes back to "HH:MM" format
    const formatTime = (minutes) => {
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
        const existingSlot = yield carSlot_model_1.carSlotBookingSlot.findOne({
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
});
exports.GenerateTimeSlots = generateTimeSlots;

import mongoose from "mongoose";
import { Request } from 'express';

export const vehicleTypeArray = [
    "car",
    "truck",
    "SUV",
    "van",
    "motorcycle",
    "bus",
    "electricVehicle",
    "hybridVehicle",
    "bicycle",
    "tractor",
] as const;

export type TUserTokenPayload = {
    _id: string;
    email: string;
    role: 'user' | 'admin';
    iat: number;
    exp: number;
};

export interface IUser {
    _id: mongoose.Types.ObjectId | string;
    email: string;
    role: 'user' | 'admin';
    iat: number;
    exp: number;
}

export interface AnotherCustomRequest extends Request {
    user?: IUser;
}

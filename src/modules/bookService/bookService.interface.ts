import { Types } from "mongoose";


type vehicleTypes = "car"
    | "truck"
    | "SUV"
    | "van"
    | "motorcycle"
    | "bus"
    | "electricVehicle"
    | "hybridVehicle"
    | "bicycle"
    | "tractor";
export type TBookService = {
    customer?: Types.ObjectId;
    serviceId: Types.ObjectId;
    slotId: Types.ObjectId;
    vehicleType: vehicleTypes;
    vehicleBrand: string;
    vehicleModel: string;
    manufacturingYear: number;
    registrationPlate: string;
}

import mongoose, { Schema, Document } from "mongoose";

interface IOrder extends Document {
  user: {
    name: string;
    email: string;
    address: string;
  };
  vehicleDetails: {
    vehicleType: string;
    vehicleBrand: string;
    vehicleModel: string;
    manufacturingYear: number;
    registrationPlate: string;
  };
  serviceDetails: {
    serviceName: string;
    price: number;
    duration: number;
    startTime: string;
    endTime: string;
    date: Date;
  };
  totalPrice: number;
  status: "Pending" | "Success";
  paymentStatus: "Pending" | "Paid";
  transactionId: string;
}

const OrderSchema: Schema = new Schema(
  {
    user: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
    },
    vehicleDetails: {
      vehicleType: { type: String, required: true },
      vehicleBrand: { type: String, required: true },
      vehicleModel: { type: String, required: true },
      manufacturingYear: { type: Number, required: true },
      registrationPlate: { type: String, required: true },
    },
    serviceDetails: {
      serviceName: { type: String, required: true },
      price: { type: Number, required: true },
      duration: { type: Number, required: true },
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
      date: { type: Date, required: true },
    },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Success"],
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },
    transactionId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>("Order", OrderSchema);

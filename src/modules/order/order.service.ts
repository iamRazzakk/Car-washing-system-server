import Order from "./order.model";
import AppError from "../../error/AppError";
import { initiatePayment } from "../payment/payment.utils";
import httpStatus from "http-status";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createOrder = async (orderData: any) => {
  const { user, vehicleDetails, serviceDetails } = orderData;

  // Generate unique transaction ID
  const transactionId = `TXN-${Date.now()}`;

  const newOrder = await Order.create({
    user: {
      name: user.name,
      email: user.email,
      address: user.address,
    },
    vehicleDetails: {
      vehicleType: vehicleDetails.vehicleType,
      vehicleBrand: vehicleDetails.vehicleBrand,
      vehicleModel: vehicleDetails.vehicleModel,
      manufacturingYear: vehicleDetails.manufacturingYear,
      registrationPlate: vehicleDetails.registrationPlate,
    },
    serviceDetails: {
      serviceName: serviceDetails.serviceName,
      price: serviceDetails.price,
      startTime: serviceDetails.startTime,
      endTime: serviceDetails.endTime,
      duration: serviceDetails.duration,
      date: serviceDetails.date,
    },
    totalPrice: serviceDetails.price,
    status: "Pending",
    paymentStatus: "Pending",
    transactionId,
  });
  // console.log(newOrder);

  // Prepare payment data for payment gateway
  const paymentData = {
    transactionId,
    totalPrice: serviceDetails.price,
    customerName: user.name,
    customerEmail: user.email,
    customerAddress: user.address,
    customerPhone: user.phone,
  };
// console.log("Payment Data is", paymentData);
  // Initiate payment session
  const paymentSession = await initiatePayment(paymentData);
// console.log("Payment session initiated", paymentSession);
  // Return payment session data
  return { newOrder, paymentSession };
};

const getAllOrders = async () => {
  const orders = await Order.find();
  if (!orders.length) {
    throw new AppError(httpStatus.NOT_FOUND, "No orders found");
  }
  return orders;
};

export const orderService = {
  createOrder,
  getAllOrders,
};

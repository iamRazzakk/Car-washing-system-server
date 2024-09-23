import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { initiatePayment } from "../payment/payment.utils";
import Order from "./order.model";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createOrder = async (orderData: any) => {
  const { user, vehicleDetails, serviceDetails } = orderData;

  const transactionId = `TXN-${Date.now()}`;

  await Order.create({
    user: {
      name: user?.name,
      email: user?.email,
      address: user?.address,
    },
    vehicleDetails: {
      vehicleType: vehicleDetails?.vehicleType,
      vehicleBrand: vehicleDetails?.vehicleBrand,
      vehicleModel: vehicleDetails?.vehicleModel,
      manufacturingYear: vehicleDetails?.manufacturingYear,
      registrationPlate: vehicleDetails?.registrationPlate,
    },
    serviceDetails,
    totalPrice: serviceDetails?.price,
    status: "Success",
    paymentStatus: "Paid",
    transactionId,
  });

  // Payment initiation data (integrate AmarPay here)
  const paymentData = {
    transactionId,
    totalPrice: serviceDetails.price,
    customerName: user.name,
    customerEmail: user.email,
    customerAddress: user.address,
    customerPhone: user.phone,
  };

  // Initiate the payment session with AmarPay
  const paymentSession = await initiatePayment(paymentData);
  console.log(paymentSession);
  // Return payment session data to be handled in the frontend
  return paymentSession;
};

const getAllOrders = async () => {
  const orders = await Order.find();
  if (!orders || orders.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'No orders found');
  }
  return orders;
}

export const orderService = {
  createOrder,
  getAllOrders
};

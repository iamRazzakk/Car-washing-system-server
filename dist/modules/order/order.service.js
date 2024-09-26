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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const order_model_1 = __importDefault(require("./order.model"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const payment_utils_1 = require("../payment/payment.utils");
const http_status_1 = __importDefault(require("http-status"));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, vehicleDetails, serviceDetails } = orderData;
    // Generate unique transaction ID
    const transactionId = `TXN-${Date.now()}`;
    const newOrder = yield order_model_1.default.create({
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
    const paymentSession = yield (0, payment_utils_1.initiatePayment)(paymentData);
    // console.log("Payment session initiated", paymentSession);
    // Return payment session data
    return { newOrder, paymentSession };
});
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.default.find();
    if (!orders.length) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "No orders found");
    }
    return orders;
});
exports.orderService = {
    createOrder,
    getAllOrders,
};

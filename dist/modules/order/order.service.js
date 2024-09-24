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
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const payment_utils_1 = require("../payment/payment.utils");
const order_model_1 = __importDefault(require("./order.model"));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, vehicleDetails, serviceDetails } = orderData;
    const transactionId = `TXN-${Date.now()}`;
    yield order_model_1.default.create({
        user: {
            name: user === null || user === void 0 ? void 0 : user.name,
            email: user === null || user === void 0 ? void 0 : user.email,
            address: user === null || user === void 0 ? void 0 : user.address,
        },
        vehicleDetails: {
            vehicleType: vehicleDetails === null || vehicleDetails === void 0 ? void 0 : vehicleDetails.vehicleType,
            vehicleBrand: vehicleDetails === null || vehicleDetails === void 0 ? void 0 : vehicleDetails.vehicleBrand,
            vehicleModel: vehicleDetails === null || vehicleDetails === void 0 ? void 0 : vehicleDetails.vehicleModel,
            manufacturingYear: vehicleDetails === null || vehicleDetails === void 0 ? void 0 : vehicleDetails.manufacturingYear,
            registrationPlate: vehicleDetails === null || vehicleDetails === void 0 ? void 0 : vehicleDetails.registrationPlate,
        },
        serviceDetails: {
            serviceId: serviceDetails === null || serviceDetails === void 0 ? void 0 : serviceDetails.serviceId,
            serviceName: serviceDetails === null || serviceDetails === void 0 ? void 0 : serviceDetails.serviceName,
            startTime: serviceDetails === null || serviceDetails === void 0 ? void 0 : serviceDetails.startTime,
            endTime: serviceDetails === null || serviceDetails === void 0 ? void 0 : serviceDetails.endTime,
            duration: serviceDetails === null || serviceDetails === void 0 ? void 0 : serviceDetails.duration,
            price: serviceDetails === null || serviceDetails === void 0 ? void 0 : serviceDetails.price,
            date: serviceDetails === null || serviceDetails === void 0 ? void 0 : serviceDetails.date,
        },
        totalPrice: serviceDetails === null || serviceDetails === void 0 ? void 0 : serviceDetails.price,
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
    const paymentSession = yield (0, payment_utils_1.initiatePayment)(paymentData);
    console.log(paymentSession);
    // Return payment session data to be handled in the frontend
    return paymentSession;
});
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.default.find();
    if (!orders || orders.length === 0) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "No orders found");
    }
    return orders;
});
exports.orderService = {
    createOrder,
    getAllOrders,
};

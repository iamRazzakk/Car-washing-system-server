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
exports.paymentService = void 0;
const order_model_1 = __importDefault(require("../order/order.model"));
const payment_utils_1 = require("./payment.utils");
const confirmationService = (transactionId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const verifyResponse = yield (0, payment_utils_1.verifyPayment)(transactionId);
    console.log(verifyResponse, "alsdkjflasdkjf");
    // Check if the payment verification response is successful and the status matches "successful"
    if (verifyResponse &&
        verifyResponse.pay_status === "Successful" &&
        status === "success") {
        // Update the order's payment status to "Paid"
        const updatedOrder = yield order_model_1.default.findOneAndUpdate({ transactionId }, { paymentStatus: "Paid" }, { new: true });
        // console.log(updatedOrder, "Update order");
        return updatedOrder;
    }
    // If the status is "failed", update the order's payment status to "Failed"
    if (status === "failed") {
        const failedOrder = yield order_model_1.default.findOneAndUpdate({ transactionId }, { paymentStatus: "Failed" }, { new: true });
        return failedOrder;
    }
    // Optionally handle "pending" or other statuses
    if (status === "pending") {
        const pendingOrder = yield order_model_1.default.findOneAndUpdate({ transactionId }, { paymentStatus: "Pending" }, { new: true });
        return pendingOrder;
    }
    return null;
});
exports.paymentService = { confirmationService };

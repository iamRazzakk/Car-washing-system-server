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
exports.verifyPayment = exports.initiatePayment = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../../config"));
// Initiate payment session with the payment gateway (AmarPay)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initiatePayment = (paymentData) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post(config_1.default.PAYMENT_URL, {
        store_id: config_1.default.STORE_ID,
        signature_key: config_1.default.SIGNATURE_KEY,
        tran_id: paymentData.transactionId,
        success_url: `${config_1.default.BASE_URL}/api/payment/confirmation?transactionId=${paymentData.transactionId}&status=success`,
        fail_url: `${config_1.default.BASE_URL}/api/payment/confirmation?transactionId=${paymentData.transactionId}&status=failure`,
        cancel_url: `${config_1.default.BASE_URL}`,
        amount: paymentData.totalPrice,
        currency: "BDT",
        desc: "Merchant Registration Payment",
        cus_name: paymentData.customerName,
        cus_email: paymentData.customerEmail,
        cus_add1: paymentData.customerAddress,
        cus_phone: paymentData.customerPhone,
        type: "json",
    });
    return response.data;
});
exports.initiatePayment = initiatePayment;
// Verify payment with the payment gateway
const verifyPayment = (transactionId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(config_1.default.PAYMENT_VERIFY_URL, {
        params: {
            store_id: config_1.default.STORE_ID,
            signature_key: config_1.default.SIGNATURE_KEY,
            type: "json",
            request_id: transactionId,
        },
    });
    return response.data;
});
exports.verifyPayment = verifyPayment;

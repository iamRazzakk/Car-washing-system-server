import axios from "axios";
import config from "../../config";

// Initiate payment session with the payment gateway (AmarPay)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const initiatePayment = async (paymentData: any) => {
  const response = await axios.post(config.PAYMENT_URL as string, {
    store_id: config.STORE_ID,
    signature_key: config.SIGNATURE_KEY,
    tran_id: paymentData.transactionId,
    success_url: `${config.BASE_URL}/api/payment/confirmation?transactionId=${paymentData.transactionId}&status=success`,
    fail_url: `${config.BASE_URL}/api/payment/confirmation?transactionId=${paymentData.transactionId}&status=failure`,
    cancel_url: `${config.BASE_URL}`,
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
};

// Verify payment with the payment gateway
export const verifyPayment = async (transactionId: string) => {
  const response = await axios.get(config.PAYMENT_VERIFY_URL as string, {
    params: {
      store_id: config.STORE_ID,
      signature_key: config.SIGNATURE_KEY,
      type:"json",
      request_id: transactionId,
    },
  });

  return response.data;
};

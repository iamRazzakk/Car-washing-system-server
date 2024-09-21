import config from "../../config";
import axios from "axios";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const initiatePayment = async (paymentData:any) => {
  const response = await axios.post(config.PAYMENT_URL as string, {
    store_id: config.STORE_ID,
    signature_key: config.SIGNATURE_KEY,
    tran_id: paymentData.transactionId,
    success_url: "http://localhost:5000/api/payments/confiramation",
    fail_url: "http://www.merchantdomain.com/failedpage.html",
    cancel_url: "http://www.merchantdomain.com/cancellpage.html",
    amount: paymentData.totalPrice,
    currency: "BDT",
    desc: "Merchant Registration Payment",
    cus_name: paymentData.customerName,
    cus_email: paymentData.customerEmail,
    cus_add1: paymentData.customerAddress,
    cus_add2: "N/A",
    cus_city: "N/A",
    cus_state: "N/A",
    cus_postcode: "N/A",
    cus_country: "N/A",
    cus_phone: paymentData.customerPhone,
    type: "json",
  });
//   console.log(response);
  return response.data;
};

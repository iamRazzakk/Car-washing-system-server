import Order from "../order/order.model";
import { verifyPayment } from "./payment.utils";

const confirmationService = async (transactionId: string, status: string) => {
  const verifyResponse = await verifyPayment(transactionId);
  console.log(verifyResponse, "alsdkjflasdkjf");
  // Check if the payment verification response is successful and the status matches "successful"
  if (
    verifyResponse &&
    verifyResponse.pay_status === "Successful" &&
    status === "success"
  ) {
    // Update the order's payment status to "Paid"
    const updatedOrder = await Order.findOneAndUpdate(
      { transactionId },
      { paymentStatus: "Paid" },
      { new: true }
    );
    // console.log(updatedOrder, "Update order");
    return updatedOrder;
  }

  // If the status is "failed", update the order's payment status to "Failed"
  if (status === "failed") {
    const failedOrder = await Order.findOneAndUpdate(
      { transactionId },
      { paymentStatus: "Failed" },
      { new: true }
    );
    return failedOrder;
  }

  // Optionally handle "pending" or other statuses
  if (status === "pending") {
    const pendingOrder = await Order.findOneAndUpdate(
      { transactionId },
      { paymentStatus: "Pending" },
      { new: true }
    );
    return pendingOrder;
  }

  return null;
};

export const paymentService = { confirmationService };

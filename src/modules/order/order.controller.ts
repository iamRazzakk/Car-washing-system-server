import { Request, Response } from "express";
import { orderService } from "./order.service";
import catchAsync from "../../utils/catchAsync";

const createOrderController = catchAsync(async (req: Request, res: Response) => {
  const orderData = req.body;
  const newOrder = await orderService.createOrder(orderData);
  res.status(201).json({
    success: true,
    message: "Order created successfully!",
    data: newOrder,
  });
});

const getAllOrderController = catchAsync(async (req: Request, res: Response) => {
  const orders = await orderService.getAllOrders();
  res.status(200).json({
    success: true,
    message: "Orders retrieved successfully!",
    data: orders,
  });
});

export const orderController = {
  createOrderController,
  getAllOrderController,
};

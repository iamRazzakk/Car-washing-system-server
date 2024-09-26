import { Router } from "express";
import { orderController } from "./order.controller";

const router = Router();

router.post("/", orderController.createOrderController);
router.get("/orders", orderController.getAllOrderController);

export const orderRoutes = router;

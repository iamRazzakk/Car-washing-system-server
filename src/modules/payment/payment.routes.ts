import { Router } from "express";
import { paymentController } from "./payment.controller";


const router = Router();
// create service route
router.post("/confiramation", paymentController.confirmationController)

export const paymentRoutes = router;

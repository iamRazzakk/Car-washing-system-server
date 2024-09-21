import { Router } from 'express';
import { createOrder } from './order.controller';

const router = Router();

// Route to create an order
router.post('/', createOrder.createOrderController);

export const orderRoutes = router;
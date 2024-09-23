import { Router } from 'express';
import { createOrder } from './order.controller';

const router = Router();

// Route to create an order
router.post('/', createOrder.createOrderController);
router.get('/orders', createOrder.getAllOrderController);

export const orderRoutes = router;
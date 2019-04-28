import { Router } from 'express';

import OrderController from '../controllers/OrderController';

const router = Router();

router.route('/:customerId/orders')
  .get(OrderController.getUserOrders);

export default router;

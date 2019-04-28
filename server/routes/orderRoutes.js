import { Router } from 'express';

import OrderController from '../controllers/OrderController';

const router = Router();

router.route('/')
  .post(OrderController.createOrder);

router.route('/:orderId')
  .get(OrderController.getSingleOrder)
  .put(OrderController.makeOrderPayment);

export default router;

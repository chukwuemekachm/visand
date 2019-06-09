/**
 * @fileOverview Contains the order routes definitions
 *
 * @author Chima Chukwuemeka
 *
 * @requires NPM:express
 * @requires server/controllers/OrderController.js
*/

import { Router } from 'express';

import OrderController from '../controllers/OrderController';

const router = Router();

router.route('/')
  .post(OrderController.createOrder);

router.route('/:orderId')
  .get(OrderController.getSingleOrder)
  .put(OrderController.makeOrderPayment);

export default router;

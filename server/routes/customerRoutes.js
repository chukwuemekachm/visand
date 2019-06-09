/**
 * @fileOverview Contains the customer routes definitions
 *
 * @author Chima Chukwuemeka
 *
 * @requires NPM:express
 * @requires server/controllers/OrderController.js
*/

import { Router } from 'express';

import OrderController from '../controllers/OrderController';

const router = Router();

router.route('/:customerId/orders')
  .get(OrderController.getUserOrders);

export default router;

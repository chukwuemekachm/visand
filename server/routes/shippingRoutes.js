/**
 * @fileOverview Contains the shipping routes definitions
 *
 * @author Chima Chukwuemeka
 *
 * @requires NPM:express
 * @requires server/controllers/ShippingController
*/

import { Router } from 'express';

import ShippingController from '../controllers/ShippingController';

const router = Router();

router.route('/')
  .get(ShippingController.getAllShippingTypes);

router.route('/regions')
  .get(ShippingController.getAllShippingRegions);

export default router;

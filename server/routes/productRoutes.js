/**
 * @fileOverview Contains the product routes definitions
 *
 * @author Chima Chukwuemeka
 *
 * @requires NPM:express
 * @requires server/controllers/ProductController.js
*/

import { Router } from 'express';

import ProductController from '../controllers/ProductController';

const router = Router();

router.route('/').get(ProductController.getAllProducts);

router.route('/:productId').get(ProductController.getSingleProduct);

router
  .route('/:productId/attributes')
  .get(ProductController.getProductAttributes);

export default router;

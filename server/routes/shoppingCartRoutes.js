import { Router } from 'express';

import ShippingCartController from '../controllers/ShippingCartController';

const router = Router();

router.route('/:cartId')
  .get(ShippingCartController.getSingleCart);

router.route('/:cartId/items')
  .post(ShippingCartController.addProductToCart);

router.route('/:cartId/items/:itemId')
  .delete(ShippingCartController.removeProductFromCart);

export default router;

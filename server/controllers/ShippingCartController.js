import ShoppingCartRepository from '../repositories/ShoppingCartRepository';
import ProductRepository from '../repositories/ProductRepository';
import { generateRandomString } from '../utils/utils';
import { NotFoundError } from '../helpers/Errors';

class ShippingCartController {
  constructor() {
    this.repository = ShoppingCartRepository;
  }

  getSingleCart = async (req, res, next) => {
    try {
      const { cartId } = req.params;
      const cart = await this.repository.getById(cartId);
      return res.status(200).json({
        message: 'Shopping Cart retrieved successfully',
        cart,
      });
    } catch (error) {
      return next(error);
    }
  }

  addProductToCart = async (req, res, next) => {
    try {
      const { productId, attributes } = req.body;
      const { cartId } = req.params;
      const [cartExists, productExists] = await Promise.all([
        this.repository.cartExists(cartId),
        ProductRepository.productExists(productId),
      ]);

      if (!productExists) {
        throw new NotFoundError(`Product with productId ${productId} does not exist`);
      }
      const validCartId = cartExists
      ? cartId
      : `vsc-${new Date().getFullYear()}-${generateRandomString()}`;
      
      await this.repository.addProduct(validCartId, productId, attributes);

      return res.status(201).json({
        message: 'Item added to shopping cart successfully',
        cart: {
          cartId: validCartId,
          item: {
            itemId: Number.parseInt(productId),
            attributes,
          }
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  removeProductFromCart = async (req, res, next) => {
    try {
      const { itemId } = req.params;
      await this.repository.removeProduct(itemId);
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }
}

export default new ShippingCartController();

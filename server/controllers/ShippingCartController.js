/**
 * @fileOverview Contains the Shopping Cart Controller class
 *
 * @author Chima Chukwuemeka
 *
 * @requires server/repositories/ShoppingCartRepository.js
 * @requires server/repositories/ProductRepository.js
 * @requires server/utils/utils.js:generateRandomString
 * @requires server/utils/utils.js:appendImageUrls
 * @requires server/helpers/Errors.js:NotFoundError
*/

import ShoppingCartRepository from '../repositories/ShoppingCartRepository';
import ProductRepository from '../repositories/ProductRepository';
import { generateRandomString, appendImageUrls } from '../utils/utils';
import { NotFoundError } from '../helpers/Errors';

/**
 * The Shopping Cart Controller class
 * @class
*/
class ShippingCartController {
  /**
   * @constructor
  */
  constructor() {
    this.repository = ShoppingCartRepository;
  }

  /**
   * @description Returns a single shopping cart on the platform by id
   *
   * @function
   * 
   * @param {object} req - The HTTP request object
   * @param {object} res - The HTTP response object
   * @param {object} next - The next middleware to be invoked
   * 
   * @returns {object}
   */
  getSingleCart = async (req, res, next) => {
    try {
      const { cartId } = req.params;
      const hostName = req.get('host');
      const cart = await this.repository.getById(cartId);
      let items = cart.items.map(item => appendImageUrls(item, hostName));

      return res.status(200).json({
        message: 'Shopping Cart retrieved successfully',
        cart: { ...cart, items },
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @description Adds an item to the shopping cart
   *
   * @function
   * 
   * @param {object} req - The HTTP request object
   * @param {object} res - The HTTP response object
   * @param {object} next - The next middleware to be invoked
   * 
   * @returns {object}
   */
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

  /**
   * @description Removes an item from the shopping cart
   *
   * @function
   * 
   * @param {object} req - The HTTP request object
   * @param {object} res - The HTTP response object
   * @param {object} next - The next middleware to be invoked
   * 
   * @returns {object}
   */
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

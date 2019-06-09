/**
 * @fileOverview Contains the Shopping Cart Repository class
 *
 * @author Chima Chukwuemeka
 *
 * @requires server/config/pool.js
 * @requires server/utils/utils.js:transformModelKeys
*/

import pool from '../config/pool';
import { transformModelKeys } from '../utils/utils';

/**
 * The Shopping Cart Repository class
 * @class
*/
class ShoppingCartRepository {
  constructor() {
    this.pool = pool;
  }

  /**
   * @description Checks if a shopping cart exists on the platform
   *
   * @function
   *
   * @param {number} cartId - The id of the shopping cart to be checked
   *
   * @returns {boolean}
  */
  async cartExists(cartId) {
    try {
      const query = 'CALL shopping_cart_get_cart_count(?)';
      const [[[{ number }]]] = await this.pool.execute(query, [cartId]);

      return !!number;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Returns a single shopping cart on the platform by id
   *
   * @function
   *
   * @param {number} cartId - The id of the shopping cart to be returned
   *
   * @returns {object}
  */
  async getById(cartId) {
    try {
      const query = 'CALL shopping_cart_get_products(?)';
      const [[products]] = await this.pool.execute(query, [cartId]);
      const parsedProducts = products.map(product => (product && product.attributes
        ? transformModelKeys({ ...product, attributes: JSON.parse(product.attributes) })
        : transformModelKeys(product)));
      const cart = {
        cartId,
        items: parsedProducts,
      };

      return cart;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Adds an item to a shopping cart on the platform
   *
   * @function
   *
   * @param {string} cartId - The customer id
   * @param {number} productId - The product/item id
   * @param {object} attributesObj - The attributes to be added alongside the item
   *
   * @returns {object}
   */
  async addProduct(cartId, productId, attributesObj = {}) {
    try {
      const query = 'CALL shopping_cart_add_product(?, ?, ?)';
      const attributes = JSON.stringify(attributesObj);
      const values = [cartId, productId, attributes];

      return this.pool.execute(query, values);
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Removes an item from the shopping cart
   *
   * @function
   *
   * @param {string} itemId - The item id to be removed
   *
   * @returns {object}
   */
  async removeProduct(itemId) {
    try {
      const query = 'CALL shopping_cart_remove_product(?)';

      return this.pool.execute(query, [itemId]);
    } catch (error) {
      throw error;
    }
  }
}

export default new ShoppingCartRepository();

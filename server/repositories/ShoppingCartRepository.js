import pool from '../config/pool';
import { transformModelKeys } from '../utils/utils';

class ShoppingCartRepository {
  constructor() {
    this.pool = pool;
  }

  async cartExists(cartId) {
    try {
      const query = 'CALL shopping_cart_get_cart_count(?)';
      const [[[{ number }]]] = await this.pool.execute(query, [cartId]);

      return !!number;
    } catch (error) {
      throw error;
    }
  }

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

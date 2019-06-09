/**
 * @fileOverview Contains the Order Repository class
 *
 * @author Chima Chukwuemeka
 *
 * @requires server/config/pool.js
 * @requires server/utils/utils.js:transformModelKeys
*/

import pool from '../config/pool';
import { transformModelKeys } from '../utils/utils';

const { TAX_ID = 2 } = process.env;

/**
 * The Order Repository class
 * @class
*/
class OrderRepository {
  /**
   * @constructor
  */
  constructor() {
    this.pool = pool;
  }

  /**
   * @description Returns a single order on the platform by id
   *
   * @function
   *
   * @param {number} orderId - The order id
   *
   * @returns {array}
   */
  async getById(orderId) {
    try {
      const query = 'CALL orders_get_order_info(?)';
      const [[[order]]] = await this.pool.execute(query, [orderId]);
      return transformModelKeys(order);
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Returns all the orders of a customer on the platform by id
   *
   * @function
   *
   * @param {number} customerId - The customer id
   *
   * @returns {array}
   */
  async getUserOrders(customerId) {
    try {
      const query = 'CALL orders_get_by_customer_id(?)';
      const [[orders]] = await this.pool.execute(query, [customerId]);
      return orders.map(order => transformModelKeys(order));
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Creates a new order record on the platform
   *
   * @function
   *
   * @param {number} customerId - The customer id
   * @param {string} cartId - The shopping cart id
   * @param {number} shippingId - The payment order id of the payment provider(paypal)
   *
   * @returns {object}
   */
  async create(customerId, cartId, shippingId) {
    try {
      const query = 'CALL shopping_cart_create_order(?, ?, ?, ?);';
      const values = [cartId, customerId, shippingId, TAX_ID];
      const [[[order]]] = await this.pool.execute(query, values);
      return transformModelKeys(order);
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Fulfills the payment details of an order on the platform
   *
   * @function
   *
   * @param {number} orderId - The order id
   * @param {string} paymentOrderId - The payment order id of the payment provider(paypal)
   *
   * @returns {object}
   */
  async fulfillOrder(orderId, paymentOrderId) {
    try {
      const query = 'CALL orders_update_order(?, ?, ?, ?, ?);';
      const values = [orderId, 10, 'Payment successful', paymentOrderId, 'default'];
      return this.pool.execute(query, values);
    } catch (error) {
      throw error;
    }
  }
}

export default new OrderRepository();

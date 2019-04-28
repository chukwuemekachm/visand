import pool from '../config/pool';
import { transformModelKeys } from '../utils/utils';

const { TAX_ID = 2 } = process.env;

class OrderRepository {
  constructor() {
    this.pool = pool;
  }

  async getById(orderId) {
    try {
      const query = 'CALL orders_get_order_info(?)';
      const [[[order]]] = await this.pool.execute(query, [orderId]);
      return transformModelKeys(order);
    } catch (error) {
      throw error;
    }
  }

  async getUserOrders(customerId) {
    try {
      const query = 'CALL orders_get_by_customer_id(?)';
      const [[orders]] = await this.pool.execute(query, [customerId]);
      return orders.map(order => transformModelKeys(order));
    } catch (error) {
      throw error;
    }
  }

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

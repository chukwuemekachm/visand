/**
 * @fileOverview Contains the Shipping Repository class
 *
 * @author Chima Chukwuemeka
 *
 * @requires server/config/pool.js
 * @requires server/utils/utils.js:transformModelKeys
*/

import pool from '../config/pool';
import { transformModelKeys } from '../utils/utils';

/**
 * The Shipping Repository class
 * @class
*/
class ShippingRepository {
  /**
   * @constructor
  */
  constructor() {
    this.pool = pool;
  }

  /**
   * @description Returns all the shipping regions on the platform
   *
   * @function
   *
   * @returns {array}
   */
  async getShippingRegions() {
    try {
      const query = 'CALL shipping_get_shipping_region();';
      const [[regions]] = await this.pool.execute(query);
      return regions.map(region => transformModelKeys(region));
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Returns all the shipping types on the platform
   *
   * @function
   *
   * @returns {array}
   */
  async getShippingTypes() {
    try {
      const query = 'CALL shipping_get_shipping();';
      const [[shippingTypes]] = await this.pool.execute(query);
      return shippingTypes.map(shippingType => transformModelKeys(shippingType));
    } catch (error) {
      throw error;
    }
  }
}

export default new ShippingRepository();

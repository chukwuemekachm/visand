import pool from '../config/pool';
import { transformModelKeys } from '../utils/utils';

class ShippingRepository {
  constructor() {
    this.pool = pool;
  }

  async getShippingRegions() {
    try {
      const query = 'CALL shipping_get_shipping_region();';
      const [[regions]] = await this.pool.execute(query);
      return regions.map(region => transformModelKeys(region));
    } catch (error) {
      throw error;
    }
  }

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

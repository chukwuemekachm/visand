import pool from '../config/pool';
import { transformToSnaKeCase, transformModelKeys } from '../utils/utils';

class UserRepository {
  constructor() {
    this.pool = pool;
  }

  async get(condition = {}) {
    try {
      let query = `
      SELECT customer_id, name, email, password, address_1, city, region
        postal_code, country, shipping_region_id, mob_phone
      FROM customer WHERE 1=1
      `;
      const values = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const key of Object.keys(condition)) {
        query += ` AND ${transformToSnaKeCase(key)} = ?`;
        values.push(condition[key]);
      }
      query += ';';
      const [users] = await this.pool.execute(query, values);
      return users.map(user => transformModelKeys(user));
    } catch (error) {
      throw error;
    }
  }

  async getOne(condition = {}) {
    try {
      const [user] = await this.get(condition);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async save(user) {
    try {
      const {
        name,
        email,
        password = '',
        address1 = '',
        city = '',
        region = '',
        shippingRegionId = 1,
        postalCode = '',
        country = '',
        mobPhone = '',
      } = user;
      const query = `
        INSERT INTO customer
        (name, email, password, address_1, city, region, shipping_region_id, postal_code, country, mob_phone)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `;
      const values = [
        name,
        email,
        password,
        address1,
        city,
        region,
        shippingRegionId,
        postalCode,
        country,
        mobPhone,
      ];
      const [result] = await this.pool.execute(query, values);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserRepository();

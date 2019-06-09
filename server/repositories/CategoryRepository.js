/**
 * @fileOverview Contains the Category Repository class
 *
 * @author Chima Chukwuemeka
 *
 * @requires server/config/pool.js
 * @requires server/utils/utils.js:transformModelKeys
*/

import pool from '../config/pool';
import { transformModelKeys } from '../utils/utils';

/**
 * The Category Repository class
 * @class
*/
class CategoryRepository {
  /**
   * @constructor
  */
  constructor() {
    this.pool = pool;
  }

  /**
   * @description Returns all the categories on the platform
   *
   * @function
   *
   * @returns {array}
   */
  async get() {
    try {
      const query = 'CALL catalog_get_categories();';
      const [[categories]] = await this.pool.execute(query);
      return categories.map(category => transformModelKeys(category));
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Returns a single category on the platform by id
   *
   * @function
   *
   * @param {number} categoryId - The category id of the category to be returned
   *
   * @returns {array}
   */
  async getById(categoryId) {
    try {
      const query = 'CALL catalog_get_category_details(?);';
      const [[[category]]] = await this.pool.execute(query, [categoryId]);
      return transformModelKeys(category);
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Returns all the products which belong to a category
   *
   * @function
   *
   * @param {number} categoryId - The category id
   * @param {number} offset - The offset to be skipped
   * @param {number} limit - The limit or number of products to be returned
   *
   * @returns {array}
   */
  async getProducts(categoryId, offset = 0, limit = Infinity) {
    try {
      const query = 'CALL catalog_get_products_in_category(?, 24, ?, ?);';
      const values = [categoryId, limit, offset];
      const [[products]] = await this.pool.execute(query, values);
      return products.map(product => transformModelKeys(product));
    } catch (error) {
      throw error;
    }
  }
}

export default new CategoryRepository();

/**
 * @fileOverview Contains the Department Repository class
 *
 * @author Chima Chukwuemeka
 *
 * @requires server/config/pool.js
 * @requires server/utils/utils.js:transformModelKeys
*/

import pool from '../config/pool';
import { transformModelKeys } from '../utils/utils';

/**
 * The Department Repository class
 * @class
*/
class DepartmentRepository {
  /**
   * @constructor
  */
  constructor() {
    this.pool = pool;
  }

  /**
   * @description Returns all the departments on the platform
   *
   * @function
   *
   * @returns {array}
   */
  async get() {
    try {
      const query = 'CALL catalog_get_departments();';
      const [[departments]] = await this.pool.execute(query);
      return departments.map(department => transformModelKeys(department));
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Returns a single department on the platform by id
   *
   * @function
   *
   * @param {number} departmentId - The department id of the category to be returned
   *
   * @returns {array}
   */
  async getById(departmentId) {
    try {
      const query = 'CALL catalog_get_department_details(?);';
      const [[[department]]] = await this.pool.execute(query, [departmentId]);
      return transformModelKeys(department);
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Returns all the products which belong to a department
   *
   * @function
   *
   * @param {number} categoryId - The department id
   * @param {number} offset - The offset to be skipped
   * @param {number} limit - The limit or number of products to be returned
   *
   * @returns {array}
   */
  async getProducts(departmentId, offset = 0, limit = Infinity) {
    try {
      const query = 'CALL catalog_get_products_on_department(?, 24, ?, ?);';
      const values = [departmentId, limit, offset];
      const [[products]] = await this.pool.execute(query, values);
      return products.map(product => transformModelKeys(product));
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Returns all the categories which belong to a department
   *
   * @function
   *
   * @param {number} departmentId - The department id
   *
   * @returns {array}
   */
  async getCategories(departmentId) {
    try {
      const query = 'CALL catalog_get_department_categories(?);';
      const [[categories]] = await this.pool.execute(query, [departmentId]);
      return categories.map(category => transformModelKeys(category));
    } catch (error) {
      throw error;
    }
  }
}

export default new DepartmentRepository();

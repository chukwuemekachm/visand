/**
 * @fileOverview Contains the Product Repository class
 *
 * @author Chima Chukwuemeka
 *
 * @requires server/config/pool.js
 * @requires server/utils/utils.js:transformModelKeys
*/

import pool from '../config/pool';
import { transformModelKeys, groupAttributesByName } from '../utils/utils';

const { INCLUDE_PRODUCT_ATTRIBUTES } = process.env;

/**
 * The Product Repository class
 * @class
*/
class ProductRepository {
  /**
   * @constructor
  */
  constructor() {
    this.pool = pool;
  }

  /**
   * @description Checks if a product exists on the platform
   *
   * @function
   *
   * @param {number} productId - The id of the product to be checked
   *
   * @returns {boolean}
  */
  async productExists(productId) {
    try {
      const query = 'CALL catalog_get_product_count(?)';
      const [[[{ number }]]] = await this.pool.execute(query, [productId]);
      return !!number;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Returns a list of products on the platform or search for products on the platform
   *
   * @function
   *
   * @param {string} search - The string to be searched
   * @param {number} offset - The offset to be skipped
   * @param {number} limit - The limit or number of products to be returned
   *
   * @returns {array}
  */
  async get(search = '', offset = 0, limit = Infinity) {
    try {
      let query;
      let values;

      if (!search) {
        query = 'CALL catalog_get_products_on_catalog(24, ?, ?);';
        values = [limit, offset];
      } else {
        query = 'CALL catalog_search(?, ?, 24, ?, ?);';
        values = [`*${search}*`, 'on', limit, offset];
      }

      const [[products]] = await this.pool.execute(query, values);
      return products.map(product => transformModelKeys(product));
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Returns a single product on the platform by id
   *
   * @function
   *
   * @param {number} productId - The id of the product to be returned
   * @param {boolean} includeAttributes - A condition to include the product attributes or not
   *
   * @returns {object}
  */
  async getById(productId, includeAttributes = INCLUDE_PRODUCT_ATTRIBUTES) {
    try {
      const productQuery = 'CALL catalog_get_product_details(?);';
      const productAttributeQuery = 'CALL catalog_get_product_attributes(?);';
      const [[[product]]] = await this.pool.execute(productQuery, [productId]);

      if (product && includeAttributes) {
        const [[attributes]] = await this.pool.execute(productAttributeQuery, [
          productId,
        ]);
        product.attributes = groupAttributesByName(attributes);
      }

      return transformModelKeys(product);
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Returns the attributes of a single product on the platform by id
   *
   * @function
   *
   * @param {number} productId - The id of the product whose attributes should to be returned
   *
   * @returns {object}
  */
  async getProductAttributes(productId) {
    try {
      const query = 'CALL catalog_get_product_attributes(?);';
      const [[attributes]] = await this.pool.execute(query, [productId]);
      return groupAttributesByName(attributes);
    } catch (error) {
      throw error;
    }
  }
}

export default new ProductRepository();

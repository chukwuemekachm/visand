import pool from '../config/pool';
import { transformModelKeys, groupAttributesByName } from '../utils/utils';

const { INCLUDE_PRODUCT_ATTRIBUTES } = process.env;

class ProductRepository {
  constructor() {
    this.pool = pool;
  }

  async productExists(productId) {
    try {
      const query = 'CALL catalog_get_product_count(?)';
      const [[[{ number }]]] = await this.pool.execute(query, [productId]);
      return !!number;
    } catch (error) {
      throw error;
    }
  }

  async get(search = '', offset = 0, limit = Infinity) {
    try {
      let query;
      let values;

      if (!search) {
        query = 'CALL catalog_get_products_on_catalog(24, ?, ?);';
        values = [limit, offset];
      } else {
        query = 'CALL catalog_search(?, ?, 24, ?, ?);';
        values = [search, 'off', limit, offset];
      }

      const [[products]] = await this.pool.execute(query, values);
      return products.map(product => transformModelKeys(product));
    } catch (error) {
      throw error;
    }
  }

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

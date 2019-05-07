import pool from '../config/pool';
import { transformModelKeys } from '../utils/utils';

class CategoryRepository {
  constructor() {
    this.pool = pool;
  }

  async get() {
    try {
      const query = 'CALL catalog_get_categories();';
      const [[categories]] = await this.pool.execute(query);
      return categories.map(category => transformModelKeys(category));
    } catch (error) {
      throw error;
    }
  }

  async getById(categoryId) {
    try {
      const query = 'CALL catalog_get_category_details(?);';
      const [[[category]]] = await this.pool.execute(query, [categoryId]);
      return transformModelKeys(category);
    } catch (error) {
      throw error;
    }
  }

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

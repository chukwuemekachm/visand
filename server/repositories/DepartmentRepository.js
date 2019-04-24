import pool from '../config/pool';
import { transformModelKeys } from '../utils/utils';

class DepartmentRepository {
  constructor() {
    this.pool = pool;
  }

  async get() {
    try {
      const query = 'CALL catalog_get_departments();';
      const [[departments]] = await this.pool.execute(query);
      return departments.map(department => transformModelKeys(department));
    } catch (error) {
      throw error;
    }
  }

  async getById(departmentId) {
    try {
      const query = 'CALL catalog_get_department_details(?);';
      const [[[department]]] = await this.pool.execute(query, [departmentId]);
      return transformModelKeys(department);
    } catch (error) {
      throw error;
    }
  }

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

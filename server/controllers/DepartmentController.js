/**
 * @fileOverview Contains the Department Controller class
 *
 * @author Chima Chukwuemeka
 *
 * @requires server/repositories/DepartmentRepository.js
 * @requires server/helpers/Errors.js:NotFoundError
 * @requires server/utils/utils.js:appendImageUrls
*/

import DepartmentRepository from '../repositories/DepartmentRepository';
import { NotFoundError } from '../helpers/Errors';
import { appendImageUrls } from '../utils/utils';

/**
 * The Department Controller class
 * @class
*/
class DepartmentController {
  /**
   * @constructor
  */
  constructor() {
    this.repository = DepartmentRepository;
  }

  /**
   * @description Returns all the departments on the platform
   *
   * @function
   * 
   * @param {object} req - The HTTP request object
   * @param {object} res - The HTTP response object
   * @param {object} next - The next middleware to be invoked
   * 
   * @returns {object}
   */
  getAllDepartments = async (req, res, next) => {
    try {
      const departments = await this.repository.get();
      return res.status(200).json({
        message: 'Departments retrieved successfully',
        departments,
      });
    } catch (error) {
      return next(error);
    }
  };

  /**
   * @description Returns a single department on the platform by id
   *
   * @function
   * 
   * @param {object} req - The HTTP request object
   * @param {object} res - The HTTP response object
   * @param {object} next - The next middleware to be invoked
   * 
   * @returns {object}
   */
  getSingleDepartment = async (req, res, next) => {
    try {
      const { departmentId } = req.params;
      const department = await this.repository.getById(departmentId);
      if (!department) {
        throw new NotFoundError(
          `Department with departmentId ${departmentId} not found`,
        );
      }
      return res.status(200).json({
        message: 'Department retrieved successfully',
        department: {
          departmentId: Number.parseInt(departmentId),
          ...department,
        },
      });
    } catch (error) {
      return next(error);
    }
  };

  /**
   * @description Returns all the products which belong to a department
   *
   * @function
   * 
   * @param {object} req - The HTTP request object
   * @param {object} res - The HTTP response object
   * @param {object} next - The next middleware to be invoked
   * 
   * @returns {object}
   */
  getDepartmentProducts = async (req, res, next) => {
    try {
      const hostName = req.get('host');
      const { departmentId } = req.params;
      const { offset, limit } = req.query;
      let products = await this.repository.getProducts(
        departmentId,
        offset,
        limit,
      );
      products = products.map(product => appendImageUrls(product, hostName));
      return res.status(200).json({
        message: `Products for department ${departmentId} retrieved successfully`,
        products,
      });
    } catch (error) {
      return next(error);
    }
  };

  /**
   * @description Returns all the categories which belong to a department
   *
   * @function
   * 
   * @param {object} req - The HTTP request object
   * @param {object} res - The HTTP response object
   * @param {object} next - The next middleware to be invoked
   * 
   * @returns {object}
   */
  getDepartmentCategories = async (req, res, next) => {
    try {
      const { departmentId } = req.params;
      const categories = await this.repository.getCategories(departmentId);
      return res.status(200).json({
        message: `Categories for department ${departmentId} retrieved successfully`,
        categories,
      });
    } catch (error) {
      return next(error);
    }
  };
}

export default new DepartmentController();

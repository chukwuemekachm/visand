/**
 * @fileOverview Contains the Category Controller class
 *
 * @author Chima Chukwuemeka
 *
 * @requires server/repositories/CategoryRepository.js
 * @requires server/helpers/Errors.js:NotFoundError
 * @requires server/utils/utils.js:appendImageUrls
*/

import CategoryRepository from '../repositories/CategoryRepository';
import { NotFoundError } from '../helpers/Errors';
import { appendImageUrls } from '../utils/utils';

/**
 * The Category Controller class
 * @class
*/
class CategoryController {
  /**
   * @constructor
  */
  constructor() {
    this.repository = CategoryRepository;
  }

  /**
   * @description Returns all the categories on the platform
   *
   * @function
   * 
   * @param {object} req - The HTTP request object
   * @param {object} res - The HTTP response object
   * @param {object} next - The next middleware to be invoked
   * 
   * @returns {object}
   */
  getAllCategories = async (req, res, next) => {
    try {
      const categories = await this.repository.get();
      return res.status(200).json({
        message: 'Categories retrieved successfully',
        categories,
      });
    } catch (error) {
      return next(error);
    }
  };

  /**
   * @description Returns a single category on the platform by id
   *
   * @function
   * 
   * @param {object} req - The HTTP request object
   * @param {object} res - The HTTP response object
   * @param {object} next - The next middleware to be invoked
   * 
   * @returns {object}
   */
  getSingleCategory = async (req, res, next) => {
    try {
      const { categoryId } = req.params;
      const category = await this.repository.getById(categoryId);
      if (!category) {
        throw new NotFoundError(
          `Category with categoryId ${categoryId} not found`,
        );
      }
      return res.status(200).json({
        message: 'Category retrieved successfully',
        category: {
          categoryId: Number.parseInt(categoryId),
          ...category,
        },
      });
    } catch (error) {
      return next(error);
    }
  };

  /**
   * @description Returns all the products which belong to a category
   *
   * @function
   * 
   * @param {object} req - The HTTP request object
   * @param {object} res - The HTTP response object
   * @param {object} next - The next middleware to be invoked
   * 
   * @returns {object}
   */
  getCategoryProducts = async (req, res, next) => {
    try {
      const hostName = req.get('host');
      const { categoryId } = req.params;
      let products = await this.repository.getProducts(categoryId);
      products = products.map(product => appendImageUrls(product, hostName));
      return res.status(200).json({
        message: `Products for category ${categoryId} retrieved successfully`,
        products,
      });
    } catch (error) {
      return next(error);
    }
  };
}

export default new CategoryController();

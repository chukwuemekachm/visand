/**
 * @fileOverview Contains the Product Controller class
 *
 * @author Chima Chukwuemeka
 *
 * @requires server/repositories/ProductRepository.js
 * @requires server/helpers/Errors.js:NotFoundError
 * @requires server/utils/utils.js:appendImageUrls
*/

import ProductRepository from '../repositories/ProductRepository';
import { NotFoundError } from '../helpers/Errors';
import { appendImageUrls } from '../utils/utils';

/**
 * The Product Controller class
 * @class
*/
class ProductController {
  /**
   * @constructor
  */
  constructor() {
    this.repository = ProductRepository;
  }

  /**
   * @description Returns a list of products on the platform on the platform.
   * Searches for products on the platform as well
   *
   * @function
   * 
   * @param {object} req - The HTTP request object
   * @param {object} res - The HTTP response object
   * @param {object} next - The next middleware to be invoked
   * 
   * @returns {object}
   */
  getAllProducts = async (req, res, next) => {
    try {
      const { search, offset, limit } = req.query;
      const hostName = req.get('host');
      let products = await this.repository.get(search, offset, limit);
      products = products.map(product => appendImageUrls(product, hostName));
      return res.status(200).json({
        message: 'Products retrieved successfully',
        products,
      });
    } catch (error) {
      return next(error);
    }
  };

  /**
   * @description Returns a single product on the platform by id
   *
   * @function
   * 
   * @param {object} req - The HTTP request object
   * @param {object} res - The HTTP response object
   * @param {object} next - The next middleware to be invoked
   * 
   * @returns {object}
   */
  getSingleProduct = async (req, res, next) => {
    try {
      const hostName = req.get('host');
      const { productId } = req.params;
      let product = await this.repository.getById(productId);
      if (!product) {
        throw new NotFoundError(
          `Product with productId ${productId} not found`,
        );
      }
      product = appendImageUrls(product, hostName);
      return res.status(200).json({
        message: 'Product retrieved successfully',
        product,
      });
    } catch (error) {
      return next(error);
    }
  };

  /**
   * @description Returns the attributes of a single on the platform by id
   *
   * @function
   * 
   * @param {object} req - The HTTP request object
   * @param {object} res - The HTTP response object
   * @param {object} next - The next middleware to be invoked
   * 
   * @returns {object}
   */
  getProductAttributes = async (req, res, next) => {
    try {
      const { productId } = req.params;
      const attributes = await this.repository.getProductAttributes(productId);
      return res.status(200).json({
        message: `Attributes for product ${productId} retrieved successfully`,
        attributes,
      });
    } catch (error) {
      return next(error);
    }
  };
}

export default new ProductController();

/**
 * @fileOverview Contains the Shipping Controller class
 *
 * @author Chima Chukwuemeka
 *
 * @requires server/repositories/ShippingRepository.js
*/

import ShippingRepository from '../repositories/ShippingRepository';

/**
 * The Product Controller class
 * @class
*/
class ShippingController {
  /**
   * @constructor
  */
  constructor() {
    this.repository = ShippingRepository;
  }

  /**
   * @description Returns all the shipping regions on the platform
   *
   * @function
   * 
   * @param {object} req - The HTTP request object
   * @param {object} res - The HTTP response object
   * @param {object} next - The next middleware to be invoked
   * 
   * @returns {object}
   */
  getAllShippingRegions = async (req, res, next) => {
    try {
      const shippingRegions = await this.repository.getShippingRegions();
      return res.status(200).json({
        message: 'Shipping regions retrieved successfully',
        shippingRegions,
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @description Returns all the shipping types on the platform
   *
   * @function
   * 
   * @param {object} req - The HTTP request object
   * @param {object} res - The HTTP response object
   * @param {object} next - The next middleware to be invoked
   * 
   * @returns {object}
   */
  getAllShippingTypes = async (req, res, next) => {
    try {
      const shippingTypes = await this.repository.getShippingTypes();
      return res.status(200).json({
        message: 'Shipping types retrieved successfully',
        shippingTypes,
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default new ShippingController();

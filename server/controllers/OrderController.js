/**
 * @fileOverview Contains the Order Controller class
 *
 * @author Chima Chukwuemeka
 *
 * @requires server/repositories/OrderRepository.js
 * @requires server/repositories/ShopppingCartRepository.js
 * @requires server/helpers/Errors.js:NotFoundError
 * @requires server/helpers/Errors.js:VisandError
 * @requires server/payPal/index.js
 * @requires server/helpers/emailSender.js:sendEmail
 * @requires server/helpers/emailTemplates.js
*/

import OrderRepository from '../repositories/OrderRepository';
import ShippingCartRepository from '../repositories/ShoppingCartRepository';
import VisandError, { NotFoundError } from '../helpers/Errors';
import verifyOrderPayment from '../payPal';
import { sendEmail } from '../helpers/emailSender';
import emailTemplates from '../helpers/emailTemplates';

/**
 * The Order Controller class
 * @class
*/
class OrderController {
  /**
   * @constructor
  */
  constructor() {
    this.repository = OrderRepository;
  }

  /**
   * @description Returns a single order on the platform by id
   * The order must belong to the authenticated user or else a 404 error is thrown
   *
   * @function
   * 
   * @param {object} req - The HTTP request object
   * @param {object} res - The HTTP response object
   * @param {object} next - The next middleware to be invoked
   * 
   * @returns {object}
   */
  getSingleOrder = async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const order = await this.repository.getById(orderId);
      if (!order) {
        throw new NotFoundError(`Order with orderId ${orderId} not found`);
      }
      return res.status(200).json({
        message: 'Order details retrieved successfully',
        order,
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @description Returns all the orders made by the authenticated user on the platform
   * 
   * @param {object} req - The HTTP request object
   * @param {object} res - The HTTP response object
   * @param {object} next - The next middleware to be invoked
   * 
   * @returns {object}
   */
  getUserOrders = async (req, res, next) => {
    try {
      const { customerId } = req.user;
      const orders = await this.repository.getUserOrders(customerId);
      return res.status(200).json({
        message: 'User orders retrieved successfully',
        orders,
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @description Creates a new order on the platform for the authenticated user
   * 
   * @param {object} req - The HTTP request object
   * @param {object} res - The HTTP response object
   * @param {object} next - The next middleware to be invoked
   * 
   * @returns {object}
   */
  createOrder = async (req, res, next) => {
    try {
      const { cartId, shippingId } = req.body;
      const { customerId } = req.user;
      const cartExists = await ShippingCartRepository.cartExists(cartId);

      if (!cartExists) {
        throw new NotFoundError(`Shopping Cart with cartId ${cartId} does not exist`);
      }
      
      const order = await this.repository.create(customerId, cartId, shippingId);
      return res.status(201).json({
        message: 'Order created successfully',
        order,
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @description Processes the payment for an order on the platform.
   * The order must belong to the authenticated user or else a 404 error is thrown
   * 
   * @param {object} req - The HTTP request object
   * @param {object} res - The HTTP response object
   * @param {object} next - The next middleware to be invoked
   * 
   * @returns {object}
   */
  makeOrderPayment = async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const { customerId, email } = req.user;
      const { paymentId } = req.body;
      const order = await this.repository.getById(orderId);
      
      if (!order) {
        throw new NotFoundError(`Order with orderId ${orderId} does not exist`);
      }
      const { totalAmount, customerId: orderCustomerId } = order;
      if (customerId !== orderCustomerId) {
        throw new NotFoundError(`Order with orderId ${orderId} does not exist`);
      }

      const result = await verifyOrderPayment(paymentId);
      if (!result) {
        throw new VisandError('Unable to complete payment now, please try again later');
      }
      const { amount, shipping } = result;
      if (Number.parseFloat(amount) === Number.parseFloat(totalAmount)) {
        await this.repository.fulfillOrder(orderId, paymentId)
        sendEmail(
          email,
          'ORDER CHECKOUT',
          emailTemplates.paymentSuccess('there', orderId),
          );
      } else {
        sendEmail(
          email,
          'ORDER CHECKOUT',
          emailTemplates.paymentFail('there', orderId),
          );
      }

      return res.status(200).json({
        message: 'Your payment is been processed',
        order: {
          orderId,
          paymentId,
        },
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default new OrderController();

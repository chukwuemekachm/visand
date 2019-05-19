import OrderRepository from '../repositories/OrderRepository';
import ShippingCartRepository from '../repositories/ShoppingCartRepository';
import VisandError, { NotFoundError } from '../helpers/Errors';
import verifyOrderPayment from '../payPal';
import { sendEmail } from '../helpers/emailSender';
import emailTemplates from '../helpers/emailTemplates';

class OrderController {
  constructor() {
    this.repository = OrderRepository;
  }

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

/**
 * @fileOverview Contains the PayPal Payment verification method
 *
 * @author Chima Chukwuemeka
 *
 * @requires NPM:@paypal/checkout-server-sdk
 * @requires server/payPal/payPalClient.js:payPalClient
*/

import payPalSdk from '@paypal/checkout-server-sdk';

import { payPalClient } from './payPalClient';

/**
 * @description Verifies the payment of an order on the platform
 *
 * @param {string} paymentId - The payment id
 *
 * @returns {object || boolean}
 */
const verifyOrderPayment = async (paymentId) => {
  try {
    const request = new payPalSdk.orders.OrdersGetRequest(paymentId);
    const { result: { purchase_units: [{ amount: { value }, shipping }] } } = await payPalClient()
      .execute(request);
    return { amount: value, shipping };
  } catch (error) {
    return false;
  }
};

export default verifyOrderPayment;

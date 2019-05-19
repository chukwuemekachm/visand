import payPalSdk from '@paypal/checkout-server-sdk';

import { payPalClient } from './payPalClient';

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

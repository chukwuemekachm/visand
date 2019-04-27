import payPalSdk from '@paypal/checkout-server-sdk';

import { payPalClient } from './payPalClient';

const { CURRENCY_CODE = 'USD' } = process.env;

const makeOrderPayment = async (amount) => {
  try {
    const request = new payPalSdk.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: CURRENCY_CODE,
          value: amount,
        },
      }],
    });
    const { result: { id, purchase_units: [{ amount: { value } }] } } = await payPalClient()
      .execute(request);
    return { paymentId: id, value };
  } catch (error) {
    return false;
  }
};

export default makeOrderPayment;

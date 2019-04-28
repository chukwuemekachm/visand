import payPalSdk from '@paypal/checkout-server-sdk';

import { capitalizeString } from '../utils/utils';

const {
  PAYPAL_CLIENT_ID = 'PAYPAL-SANDBOX-CLIENT-ID',
  PAYPAL_CLIENT_SECRET = 'PAYPAL-SANDBOX-CLIENT-SECRET',
} = process.env;

const environment = () => new payPalSdk.core
  .SandboxEnvironment(PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET);

export const payPalClient = () => new payPalSdk.core.PayPalHttpClient(environment());

export const prettyPrint = async (jsonData, pre = '') => {
  let pretty = '';

  Object.keys(jsonData).forEach(async (key) => {
    if (Number.isNaN(key)) {
      pretty += `${pre + capitalizeString(key)}: `;
    } else {
      pretty += `${pre + (Number.parseInt(key, 10) + 1)}: `;
    }
    if (typeof jsonData[key] === 'object') {
      pretty += '\n';
      pretty += await prettyPrint(jsonData[key], `${pre}    `);
    } else {
      pretty += `${jsonData[key]}\n`;
    }
  });

  return pretty;
};

export default payPalClient;

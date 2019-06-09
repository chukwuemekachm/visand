import 'dotenv/config';
import { describe, test, before } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../server';
import { generateToken } from '../server/helpers/jwtHelper';

chai.use(chaiHttp);
const { expect } = chai;
const BASE_URL = '/api/v1/order';
const { request } = chai;
let authToken;
let myOrderId;

describe('ORDER ROUTES', () => {
  before(() => {
    authToken = generateToken({
      email: 'test.user@mail.com',
      customerId: 1,
    });
  });
  describe('/api/v1/order', () => {
    test('should return a 404 error when cart id is not valid on the system', async () => {
      const { body: { message, order }, status } = await request(server)
        .post(`${BASE_URL}`)
        .send({ cartId: 'vsc-2019-u8rstuvwxyz9', shippingId: 1 })
        .set('Authorization', `Bearer ${authToken}`);
      expect(message).to.equal('Shopping Cart with cartId vsc-2019-u8rstuvwxyz9 does not exist');
      expect(status).to.equal(404);
      expect(order).to.equal(undefined);
    });

    test('should create an order on the system', async () => {
      const { body: { message, order: { orderId } }, status } = await request(server)
        .post(`${BASE_URL}`)
        .send({ cartId: 'vsc-2019-abcdefgh', shippingId: 1 })
        .set('Authorization', `Bearer ${authToken}`);
      expect(message).to.equal('Order created successfully');
      expect(status).to.equal(201);
      expect(typeof orderId).to.equal('number');
      myOrderId = orderId;
    });
  });

  describe('/api/v1/order/:orderId', () => {
    test('should return 200 and the details of an order on the platform', async () => {
      const { body: { order, message }, status } = await request(server)
        .get(`${BASE_URL}/${myOrderId}`)
        .set('Authorization', `Bearer ${authToken}`);
      const {
        orderId, totalAmount, createdOn, status: orderStatus, customerId,
        shippingId, shippingType, shippingCost, taxId, taxType, taxPercentage,
      } = order;
      expect(message).to.equal('Order details retrieved successfully');
      expect(status).to.equal(200);
      expect(typeof orderId).to.equal('number');
      expect(typeof totalAmount).to.equal('string');
      expect(typeof createdOn).to.equal('string');
      expect(typeof orderStatus).to.equal('number');
      expect(typeof customerId).to.equal('number');
      expect(typeof shippingId).to.equal('number');
      expect(typeof shippingType).to.equal('string');
      expect(typeof shippingCost).to.equal('string');
      expect(typeof taxId).to.equal('number');
      expect(typeof taxType).to.equal('string');
      expect(typeof taxPercentage).to.equal('string');
    });

    test('should return 404 when order is not on the platform', async () => {
      const { body: { order, message }, status } = await request(server)
        .get(`${BASE_URL}/878839`).set('Authorization', `Bearer ${authToken}`);
      expect(message).to.equal('Order with orderId 878839 not found');
      expect(status).to.equal(404);
      expect(order).to.equal(undefined);
    });

    test('should return 200 and fulfil an order on the platform', async () => {
      const { body: { order: { orderId, paymentId }, message }, status } = await request(server)
        .put(`${BASE_URL}/1`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ paymentId: '8CV392047K6653150' });
      expect(message).to.equal('Your payment is been processed');
      expect(status).to.equal(200);
      expect(typeof orderId).to.equal('string');
      expect(typeof paymentId).to.equal('string');
    });
  });

  describe('/api/v1/customer/:customerId/orders', () => {
    test('should return all the authenticated users orders', async () => {
      const { body: { message, orders }, status } = await request(server)
        .get('/api/v1/customer/:customerId/orders')
        .set('Authorization', `Bearer ${authToken}`);
      const [{
        orderId, totalAmount, createdOn, status: orderStatus, name,
      }] = orders;
      expect(message).to.equal('User orders retrieved successfully');
      expect(status).to.equal(200);
      expect(typeof orderId).to.equal('number');
      expect(typeof totalAmount).to.equal('string');
      expect(typeof createdOn).to.equal('string');
      expect(typeof orderStatus).to.equal('number');
      expect(typeof name).to.equal('string');
    });
  });
});

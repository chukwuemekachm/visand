import 'dotenv/config';
import { describe, test } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../server';

chai.use(chaiHttp);
const { expect } = chai;
const BASE_URL = '/api/v1/shopping-cart';
const { request } = chai;

let myCartId = 'vsc-2019-njmd4j949is33x';

describe('SHOPPING CART ROUTES', () => {
  describe('/api/v1/shopping-cart/:cartId', () => {
    test('should add an item to the cart', async () => {
      const { body: { cart: { cartId }, message }, status } = await request(server)
        .post(`${BASE_URL}/${myCartId}/items`).send({ productId: 20 });
      expect(message).to.equal('Item added to shopping cart successfully');
      expect(status).to.equal(201);
      expect(cartId).not.equal(myCartId);
      myCartId = cartId;
    });
  });

  describe('/api/v1/shopping-cart/:cartId', () => {
    test('should retrieve the details of a cart', async () => {
      const { body: { cart: { cartId, items }, message }, status } = await request(server)
        .get(`${BASE_URL}/${myCartId}`);
      expect(message).to.equal('Shopping Cart retrieved successfully');
      expect(status).to.equal(200);
      expect(cartId).to.equal(myCartId);
      expect(typeof cartId).to.equal('string');
      expect(typeof items).to.equal('object');
    });
  });

  describe('/api/v1/shopping-cart/:cartId/items/:itemId', () => {
    test('should remove an', async () => {
      const { status } = await request(server)
        .delete(`${BASE_URL}/${myCartId}/items/${myCartId}`);
      expect(status).to.equal(204);
    });
  });
});

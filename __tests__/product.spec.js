import 'dotenv/config';
import { describe, test } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../server';

chai.use(chaiHttp);
const { expect } = chai;
const BASE_URL = '/api/v1/product';
const { request } = chai;

describe('PRODUCT ROUTES TESTS', () => {
  describe('/api/v1/products', () => {
    test('should return 200 and 5 products on the platform', async () => {
      const {
        body: { message, errors, products },
        status,
      } = await request(server).get(`${BASE_URL}?offset=0&limit=5`);
      const [
        { productId, name, description, price, discountedPrice, thumbnail },
      ] = products;
      expect(message).to.equal('Products retrieved successfully');
      expect(status).to.equal(200);
      expect(errors).to.equal(undefined);
      expect(products.length).to.lte(5);
      expect(typeof productId).to.equal('number');
      expect(typeof name).to.equal('string');
      expect(typeof description).to.equal('string');
      expect(typeof price).to.equal('string');
      expect(typeof discountedPrice).to.equal('string');
      expect(typeof thumbnail).to.equal('string');
    });

    describe('/api/v1/product/:productId', () => {
      test('should return 200 and a single product on the platform', async () => {
        const {
          body: { message, errors, product },
          status,
        } = await request(server).get(`${BASE_URL}/1`);
        const {
          productId,
          name,
          description,
          price,
          discountedPrice,
          image,
          image2,
        } = product;
        expect(message).to.equal('Product retrieved successfully');
        expect(status).to.equal(200);
        expect(errors).to.equal(undefined);
        expect(typeof productId).to.equal('number');
        expect(typeof name).to.equal('string');
        expect(typeof description).to.equal('string');
        expect(typeof price).to.equal('string');
        expect(typeof discountedPrice).to.equal('string');
        expect(typeof image).to.equal('string');
        expect(typeof image2).to.equal('string');
      });

      test('should return 404 when product is not on the platform', async () => {
        const {
          body: { message, errors, product },
          status,
        } = await request(server).get(`${BASE_URL}/903`);
        expect(message).to.equal('Product with productId 903 not found');
        expect(status).to.equal(404);
        expect(errors).to.equal(undefined);
        expect(product).to.equal(undefined);
      });
    });

    describe('/api/v1/product/:productId/attributes', () => {
      test('should return 200 and a single product on the platform', async () => {
        const {
          body: { message, errors, attributes },
          status,
        } = await request(server).get(`${BASE_URL}/1/attributes`);
        const {
          Color: [{ attributeName, attributeValueId, attributeValue }],
          Size: [size],
        } = attributes;
        expect(message).to.equal(
          'Attributes for product 1 retrieved successfully',
        );
        expect(status).to.equal(200);
        expect(errors).to.equal(undefined);
        expect(typeof attributeValueId).to.equal('number');
        expect(typeof attributeName).to.equal('string');
        expect(typeof attributeValue).to.equal('string');
        expect(typeof size).to.equal('object');
      });
    });
  });
});

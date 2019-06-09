import 'dotenv/config';
import { describe, test } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../server';

chai.use(chaiHttp);
const { expect } = chai;
const BASE_URL = '/api/v1/category';
const { request } = chai;

describe('CATEGORY ROUTES TESTS', () => {
  describe('/api/v1/category', () => {
    test('should return 200 and all categories on the platform', async () => {
      const {
        body: { message, errors, categories },
        status,
      } = await request(server).get(`${BASE_URL}/`);
      const [{ categoryId, name, description }] = categories;
      expect(message).to.equal('Categories retrieved successfully');
      expect(status).to.equal(200);
      expect(errors).to.equal(undefined);
      expect(typeof categoryId).to.equal('number');
      expect(typeof name).to.equal('string');
      expect(typeof description).to.equal('string');
    });
  });

  describe('/api/v1/category/:categoryId', () => {
    test('should return 200 and a single category on the platform', async () => {
      const {
        body: { message, errors, category },
        status,
      } = await request(server).get(`${BASE_URL}/1`);
      const { categoryId, name, description } = category;
      expect(message).to.equal('Category retrieved successfully');
      expect(status).to.equal(200);
      expect(errors).to.equal(undefined);
      expect(typeof categoryId).to.equal('number');
      expect(typeof name).to.equal('string');
      expect(typeof description).to.equal('string');
    });

    test('should return 404 when category is not on the platform', async () => {
      const {
        body: { message, errors, category },
        status,
      } = await request(server).get(`${BASE_URL}/14339`);
      expect(message).to.equal('Category with categoryId 14339 not found');
      expect(status).to.equal(404);
      expect(errors).to.equal(undefined);
      expect(category).to.equal(undefined);
    });
  });

  describe('/api/v1/category/:categoryId/products', () => {
    test('should return 200 and products associated with the category on the platform', async () => {
      const {
        body: { message, errors, products },
        status,
      } = await request(server).get(`${BASE_URL}/1/products`);
      const [
        { productId, name, description, price, discountedPrice },
      ] = products;
      expect(message).to.equal(
        'Products for category 1 retrieved successfully',
      );
      expect(status).to.equal(200);
      expect(errors).to.equal(undefined);
      expect(typeof productId).to.equal('number');
      expect(typeof name).to.equal('string');
      expect(typeof description).to.equal('string');
      expect(typeof price).to.equal('string');
      expect(typeof discountedPrice).to.equal('string');
    });
  });
});

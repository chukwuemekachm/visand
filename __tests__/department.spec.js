import 'dotenv/config';
import { describe, test } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../server';

chai.use(chaiHttp);
const { expect } = chai;
const BASE_URL = '/api/v1/department';
const { request } = chai;

describe('DEPARTMENT ROUTES TESTS', () => {
  describe('/api/v1/category', () => {
    test('should return 200 and all departments on the platform', async () => {
      const {
        body: { message, errors, departments },
        status,
      } = await request(server).get(`${BASE_URL}/`);
      const [{ departmentId, name }] = departments;
      expect(message).to.equal('Departments retrieved successfully');
      expect(status).to.equal(200);
      expect(errors).to.equal(undefined);
      expect(typeof departmentId).to.equal('number');
      expect(typeof name).to.equal('string');
    });
  });

  describe('/api/v1/category/:categoryId', () => {
    test('should return 200 and a single department on the platform', async () => {
      const {
        body: { message, errors, department },
        status,
      } = await request(server).get(`${BASE_URL}/1`);
      const { departmentId, name, description } = department;
      expect(message).to.equal('Department retrieved successfully');
      expect(status).to.equal(200);
      expect(errors).to.equal(undefined);
      expect(typeof departmentId).to.equal('number');
      expect(typeof name).to.equal('string');
      expect(typeof description).to.equal('string');
    });

    test('should return 404 when category is not on the platform', async () => {
      const {
        body: { message, errors, department },
        status,
      } = await request(server).get(`${BASE_URL}/189778`);
      expect(message).to.equal('Department with departmentId 189778 not found');
      expect(status).to.equal(404);
      expect(errors).to.equal(undefined);
      expect(department).to.equal(undefined);
    });
  });

  describe('/api/v1/department/:departmentId/products', () => {
    test('should return 200 and products associated with the department on the platform', async () => {
      const {
        body: { message, errors, products },
        status,
      } = await request(server).get(`${BASE_URL}/1/products`);
      const [
        { productId, name, description, price, discountedPrice },
      ] = products;
      expect(message).to.equal(
        'Products for department 1 retrieved successfully',
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

  describe('/api/v1/department/:departmentId/categories', () => {
    test('should return 200 and categories associated with the department on the platform', async () => {
      const {
        body: { message, errors, categories },
        status,
      } = await request(server).get(`${BASE_URL}/1/categories`);
      const [{ categoryId, name, description }] = categories;
      expect(message).to.equal(
        'Categories for department 1 retrieved successfully',
      );
      expect(status).to.equal(200);
      expect(errors).to.equal(undefined);
      expect(typeof categoryId).to.equal('number');
      expect(typeof name).to.equal('string');
      expect(typeof description).to.equal('string');
    });
  });
});

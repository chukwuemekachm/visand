import 'dotenv/config';
import { describe, test } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../server';
import users from '../fixtures/users';

chai.use(chaiHttp);
const { expect } = chai;
const BASE_URL = '/api/v1/auth';
const { request } = chai;

describe('AUTHENTICATION TESTS', () => {
  describe('/api/v1/auth/signup', () => {
    test('should return a 400 validation error when no fields are sent', async () => {
      const {
        body: { message, errors },
        status,
      } = await request(server).post(`${BASE_URL}/signup`);
      expect(message).to.equal('Some fields are failing validation(s)');
      expect(status).to.equal(400);
      expect(errors).to.be.an('object');
    });

    test('should return a 200 and signup the user', async () => {
      const {
        body: { message, errors, user, token },
        status,
      } = await request(server)
        .post(`${BASE_URL}/signup`)
        .send({ ...users[1] });
      expect(errors).to.be.equal(undefined);
      expect(message).equal('User registration successful');
      expect(status).to.equal(201);
      expect(user.email).to.equal(users[1].email);
      expect(user.name).to.equal(users[1].name);
      expect(user.mobPhone).to.equal(users[1].mobPhone);
      expect(user.address1).to.equal(users[1].address1);
      expect(typeof token).to.equal('string');
    });

    test('should return a 409 error when user already exists', async () => {
      const {
        body: { message, user },
        status,
      } = await request(server)
        .post(`${BASE_URL}/signup`)
        .send({ ...users[1] });
      expect(user).to.be.equal(undefined);
      expect(message).equal(`A user with email ${users[1].email} exists`);
      expect(status).to.equal(409);
    });
  });

  describe('/api/v1/auth/login', () => {
    test('should return a 400 validation error when no fields are sent', async () => {
      const {
        body: { message, errors },
        status,
      } = await request(server).post(`${BASE_URL}/login`);
      expect(message).to.equal('Some fields are failing validation(s)');
      expect(status).to.equal(400);
      expect(errors).to.be.an('object');
    });

    test('should return a 200 and authenticate the user', async () => {
      const {
        body: { message, errors, user, token },
        status,
      } = await request(server)
        .post(`${BASE_URL}/login`)
        .send({ ...users[1] });
      expect(errors).to.be.equal(undefined);
      expect(message).equal('User login successful');
      expect(status).to.equal(200);
      expect(user.email).to.equal(users[1].email);
      expect(user.name).to.equal(users[1].name);
      expect(user.mobPhone).to.equal(users[1].mobPhone);
      expect(user.address1).to.equal(users[1].address1);
      expect(typeof token).to.equal('string');
    });

    test('should return a 401 error when credentials are invalid', async () => {
      const {
        body: { message, user },
        status,
      } = await request(server)
        .post(`${BASE_URL}/login`)
        .send({ ...users[2] });
      expect(user).to.be.equal(undefined);
      expect(message).equal('Invaild login credentials');
      expect(status).to.equal(401);
    });
  });
});

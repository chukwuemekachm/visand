import 'dotenv/config';
import { describe, test } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../server';

chai.use(chaiHttp);
const { expect } = chai;
const BASE_URL = '/api/v1/shipping';
const { request } = chai;

describe('SHIPPING ROUTES', () => {
  describe('/api/v1/shipping', () => {
    test('should return all shipping types on the platform', async () => {
      const { body: { shippingTypes, message }, status } = await request(server)
        .get(`${BASE_URL}/`);
      const [{
        shippingId, shippingType, shippingCost, shippingRegionId,
      }] = shippingTypes;
      expect(message).to.equal('Shipping types retrieved successfully');
      expect(status).to.equal(200);
      expect(typeof shippingId).to.equal('number');
      expect(typeof shippingType).to.equal('string');
      expect(typeof shippingCost).to.equal('string');
      expect(typeof shippingRegionId).to.equal('number');
    });
  });

  describe('/api/v1/shipping/regions', () => {
    test('should return all shipping regions on the platform', async () => {
      const { body: { shippingRegions, message }, status } = await request(server)
        .get(`${BASE_URL}/regions`);
      const [{ shippingRegionId, shippingRegion }] = shippingRegions;
      expect(message).to.equal('Shipping regions retrieved successfully');
      expect(status).to.equal(200);
      expect(typeof shippingRegion).to.equal('string');
      expect(typeof shippingRegionId).to.equal('number');
    });
  });
});

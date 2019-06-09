/**
 * @fileOverview Contains the JWT helpers used on the server
 *
 * @author Chima Chukwuemeka
 *
 * @requires NPM:jsonwebtoken
*/

import * as jwt from 'jsonwebtoken';

const { APP_SECRET } = process.env;

/**
 * @description Generates a JWT token
 *
 * @param {object} payload - The payload to be signed with the JWT
 *
 * @returns {string}
 */
export const generateToken = payload => jwt.sign(payload, APP_SECRET, { expiresIn: '72h' });

/**
 * @description Decodes a JWT token
 *
 * @param {object} userEmail - The HTTP request object
 *
 * @returns {boolean}
 */
export const decodeToken = (req) => {
  try {
    const authorization = req.get('Authorization') || req.get('token') || req.get('x-access-token');
    if (authorization) {
      const token = authorization.replace('Bearer ', '');
      return jwt.verify(token, APP_SECRET);
    }
    return false;
  } catch (error) {
    return false;
  }
};

export default generateToken;

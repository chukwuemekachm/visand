/**
 * @fileOverview Contains the permission middleware used on the server
 *
 * @author Chima Chukwuemeka
 *
 * @requires server/repositories/DepartmentRepository.js
 * @requires server/helpers/Errors.js:AuthenticationError
*/

import { decodeToken } from '../helpers/jwtHelper';
import { AuthenticationError } from '../helpers/Errors';

/**
 * @description Authenticates the validity of a JWT token
 *
 * @param {object} req - The HTTP request object
 * @param {object} res - The HTTP response object
 * @param {object} next - The next middleware to be invoked
 *
 * @returns {object}
 */
const authenticateUser = (req, res, next) => {
  try {
    const decoded = decodeToken(req);
    if (!decoded) {
      throw new AuthenticationError('Authentication is required for this operation');
    }
    req.user = decoded;
    return next();
  } catch (error) {
    return next(error);
  }
};

export default authenticateUser;

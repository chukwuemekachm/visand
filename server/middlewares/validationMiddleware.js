/**
 * @fileOverview Contains the validation middleware used on the server
 *
 * @author Chima Chukwuemeka
 *
 * @requires server/validator/index.js:validatePayload
 * @requires server/validator/index.js:signUpSchema
 * @requires server/validator/index.js:loginSchema
*/

import validatePayload, { signUpSchema, loginSchema } from '../validator';

const schemaMap = {
  signup: signUpSchema,
  login: loginSchema,
};

/**
 * @description Validates the request payload
 *
 * @param {object} req - The HTTP request object
 * @param {object} res - The HTTP response object
 * @param {object} next - The next middleware to be invoked
 *
 * @returns {object}
 */
const validateRequest = async (req, res, next) => {
  try {
    const { path, body: payload } = req;
    const schema = schemaMap[path.substring(1)];
    await validatePayload({ payload, schema });
    return next();
  } catch (error) {
    return next(error);
  }
};

export default validateRequest;

import Validator from 'validatorjs';

import { ValidationError } from '../helpers/Errors';

/**
 * @description Validates the values in a payload
 *
 * @param {object} payload - The product to be modified
 * @param {object} schema - The hostName to be appended
 *
 * @returns {boolean}
 */
const validatePayload = async ({ payload, schema }) => {
  const validator = new Validator(payload, schema);
  const fails = await validator.fails();
  if (fails) {
    const errors = validator.errors.all();
    throw new ValidationError(errors);
  }
  return true;
};

export * from './schemas/authSchemas';
export default validatePayload;

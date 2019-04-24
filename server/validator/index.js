import Validator from 'validatorjs';

import { ValidationError } from '../helpers/Errors';

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

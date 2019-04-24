import validatePayload, { signUpSchema, loginSchema } from '../validator';

const schemaMap = {
  signup: signUpSchema,
  login: loginSchema,
};
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

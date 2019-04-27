import * as jwt from 'jsonwebtoken';

const { APP_SECRET } = process.env;

export const generateToken = payload => jwt.sign(payload, APP_SECRET, { expiresIn: '72h' });

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

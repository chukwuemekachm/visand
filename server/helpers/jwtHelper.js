import * as jwt from 'jsonwebtoken';

const { APP_SECRET } = process.env;

export const generateToken = payload =>
  jwt.sign(payload, APP_SECRET, { expiresIn: '72h' });

export default generateToken;

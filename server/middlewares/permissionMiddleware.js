import { decodeToken } from '../helpers/jwtHelper';
import { AuthenticationError } from '../helpers/Errors';

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

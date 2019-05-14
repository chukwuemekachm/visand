import bcrypt from 'bcryptjs';

import UserRepository from '../repositories/CustomerRepository';
import { generateToken } from '../helpers/jwtHelper';
import { AuthenticationError, DuplicationError } from '../helpers/Errors';

class AuthController {
  constructor() {
    this.repository = UserRepository;
  }

  signup = async (req, res, next) => {
    const {
      name,
      email,
      password,
      address1,
      city,
      region,
      shippingRegionId,
      postalCode,
      country,
      mobPhone,
    } = req.body;
    try {
      const user = await this.repository.getOne({ email });
      if (user) {
        throw new DuplicationError(`A user with email ${email} exists`);
      }
      const passwordHash = await bcrypt.hash(password, 10);
      const { insertId: customerId } = await this.repository.save({
        name,
        email,
        password: passwordHash,
        address1,
        city,
        region,
        shippingRegionId,
        postalCode,
        country,
        mobPhone,
      });
      const token = generateToken({ email, customerId });
      return res.status(201).json({
        message: 'User registration successful',
        user: {
          email,
          name,
          mobPhone,
          address1,
        },
        token,
      });
    } catch (error) {
      return next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await this.repository.getOne({ email });
      if (!user) {
        throw new AuthenticationError('Invaild login credentials');
      }
      const {
        customerId,
        password: userPassword,
        name,
        mobPhone,
        address1,
      } = user;
      const valid = await bcrypt.compare(password, userPassword);
      if (!valid) {
        throw new AuthenticationError('Invaild login credentials');
      }

      const token = generateToken({ email, customerId });
      return res.status(200).json({
        message: 'User login successful',
        user: {
          email,
          name,
          mobPhone,
          address1,
        },
        token,
      });
    } catch (error) {
      return next(error);
    }
  };

  facebookAuth = async (req, res, next) => {
    try {
      const { user: { email, name } } = req;
      const user = await this.repository.getOne({ email });
      if (user) {
        const {
          customerId,
          mobPhone,
          address1,
        } = user;
        const token = generateToken({ email, customerId });
        return res.status(200).json({
          message: 'User facebook signin successful',
          user: {
            email,
            name,
            mobPhone,
            address1,
          },
          token,
        });
      }
      const { insertId: customerId } = await this.repository.save({
        name,
        email,
      });
      const token = generateToken({ email, customerId });
      return res.status(201).json({
        message: 'User facebook signin successful',
        user: {
          email,
          name,
        },
        token,
      });
    } catch (error) {
      return next(error);
    }
  };
}

export default new AuthController();

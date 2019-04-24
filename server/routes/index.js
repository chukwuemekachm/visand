import { Router } from 'express';

import authRoutes from './authRoutes';
import validationMiddleware from '../middlewares/validationMiddleware';

const router = Router();

router.get('/', (req, res) =>
  res.status(200).json({
    message: 'Welcome to visand is an e-commerce web service API',
  }),
);

router.use('/auth', validationMiddleware, authRoutes);

export default router;

import { Router } from 'express';

import authRoutes from './authRoutes';
import productRoutes from './productRoutes';
import categoryRoutes from './categoryRoutes';
import departmentRoutes from './departmentRoutes';
import validationMiddleware from '../middlewares/validationMiddleware';

const router = Router();

router.get('/', (req, res) =>
  res.status(200).json({
    message: 'Welcome to visand is an e-commerce web service API',
  }),
);

router.use('/auth', validationMiddleware, authRoutes);
router.use('/product', productRoutes);
router.use('/category', categoryRoutes);
router.use('/department', departmentRoutes);

export default router;

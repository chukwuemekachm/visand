import { Router } from 'express';

import authRoutes from './authRoutes';
import productRoutes from './productRoutes';
import categoryRoutes from './categoryRoutes';
import departmentRoutes from './departmentRoutes';
import shoppingCartRoutes from './shoppingCartRoutes';
import shippingRoutes from './shippingRoutes';
import orderRoutes from './orderRoutes';
import customerRoutes from './customerRoutes';
import validationMiddleware from '../middlewares/validationMiddleware';
import permissionMiddleware from '../middlewares/permissionMiddleware';

const router = Router();

router.get('/', (req, res) => res.status(200).json({
  message: 'Welcome to visand is an e-commerce web service API',
}));

router.use('/auth', validationMiddleware, authRoutes);
router.use('/product', productRoutes);
router.use('/category', categoryRoutes);
router.use('/department', departmentRoutes);
router.use('/shopping-cart', shoppingCartRoutes);
router.use('/shipping', shippingRoutes);
router.use('/order', permissionMiddleware, orderRoutes);
router.use('/customer', permissionMiddleware, customerRoutes);

export default router;

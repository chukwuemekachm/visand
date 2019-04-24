import { Router } from 'express';

import CategoryController from '../controllers/CategoryController';

const router = Router();

router.route('/').get(CategoryController.getAllCategories);

router.route('/:categoryId').get(CategoryController.getSingleCategory);

router
  .route('/:categoryId/products')
  .get(CategoryController.getCategoryProducts);

export default router;

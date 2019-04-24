import { Router } from 'express';

import DepartmentController from '../controllers/DepartmentController';

const router = Router();

router.route('/').get(DepartmentController.getAllDepartments);

router.route('/:departmentId').get(DepartmentController.getSingleDepartment);

router
  .route('/:departmentId/products')
  .get(DepartmentController.getDepartmentProducts);

router
  .route('/:departmentId/categories')
  .get(DepartmentController.getDepartmentCategories);

export default router;

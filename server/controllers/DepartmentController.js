import DepartmentRepository from '../repositories/DepartmentRepository';
import { NotFoundError } from '../helpers/Errors';
import { appendImageUrls } from '../utils/utils';

class DepartmentController {
  constructor() {
    this.repository = DepartmentRepository;
  }

  getAllDepartments = async (req, res, next) => {
    try {
      const departments = await this.repository.get();
      return res.status(200).json({
        message: 'Departments retrieved successfully',
        departments,
      });
    } catch (error) {
      return next(error);
    }
  };

  getSingleDepartment = async (req, res, next) => {
    try {
      const { departmentId } = req.params;
      const department = await this.repository.getById(departmentId);
      if (!department) {
        throw new NotFoundError(
          `Department with departmentId ${departmentId} not found`,
        );
      }
      return res.status(200).json({
        message: 'Department retrieved successfully',
        department: {
          departmentId: Number.parseInt(departmentId),
          ...department,
        },
      });
    } catch (error) {
      return next(error);
    }
  };

  getDepartmentProducts = async (req, res, next) => {
    try {
      const hostName = req.get('host');
      const { departmentId } = req.params;
      const { offset, limit } = req.query;
      let products = await this.repository.getProducts(
        departmentId,
        offset,
        limit,
      );
      products = products.map(product => appendImageUrls(product, hostName));
      return res.status(200).json({
        message: `Products for department ${departmentId} retrieved successfully`,
        products,
      });
    } catch (error) {
      return next(error);
    }
  };

  getDepartmentCategories = async (req, res, next) => {
    try {
      const { departmentId } = req.params;
      const categories = await this.repository.getCategories(departmentId);
      return res.status(200).json({
        message: `Categories for department ${departmentId} retrieved successfully`,
        categories,
      });
    } catch (error) {
      return next(error);
    }
  };
}

export default new DepartmentController();

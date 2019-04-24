import CategoryRepository from '../repositories/CategoryRepository';
import { NotFoundError } from '../helpers/Errors';

class CategoryController {
  constructor() {
    this.repository = CategoryRepository;
  }

  getAllCategories = async (req, res, next) => {
    try {
      const categories = await this.repository.get();
      return res.status(200).json({
        message: 'Categories retrieved successfully',
        categories,
      });
    } catch (error) {
      return next(error);
    }
  };

  getSingleCategory = async (req, res, next) => {
    try {
      const { categoryId } = req.params;
      const category = await this.repository.getById(categoryId);
      if (!category) {
        throw new NotFoundError(
          `Category with categoryId ${categoryId} not found`,
        );
      }
      return res.status(200).json({
        message: 'Category retrieved successfully',
        category: {
          categoryId: Number.parseInt(categoryId),
          ...category,
        },
      });
    } catch (error) {
      return next(error);
    }
  };

  getCategoryProducts = async (req, res, next) => {
    try {
      const { categoryId } = req.params;
      const products = await this.repository.getProducts(categoryId);
      return res.status(200).json({
        message: `Products for category ${categoryId} retrieved successfully`,
        products,
      });
    } catch (error) {
      return next(error);
    }
  };
}

export default new CategoryController();
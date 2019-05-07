import ProductRepository from '../repositories/ProductRepository';
import { NotFoundError } from '../helpers/Errors';
import { appendImageUrls } from '../utils/utils';

class ProductController {
  constructor() {
    this.repository = ProductRepository;
  }

  getAllProducts = async (req, res, next) => {
    try {
      const { search, offset, limit } = req.query;
      const hostName = req.get('host');
      let products = await this.repository.get(search, offset, limit);
      products = products.map(product => appendImageUrls(product, hostName));
      return res.status(200).json({
        message: 'Products retrieved successfully',
        products,
      });
    } catch (error) {
      return next(error);
    }
  };

  getSingleProduct = async (req, res, next) => {
    try {
      const hostName = req.get('host');
      const { productId } = req.params;
      let product = await this.repository.getById(productId);
      if (!product) {
        throw new NotFoundError(
          `Product with productId ${productId} not found`,
        );
      }
      product = appendImageUrls(product, hostName);
      return res.status(200).json({
        message: 'Product retrieved successfully',
        product,
      });
    } catch (error) {
      return next(error);
    }
  };

  getProductAttributes = async (req, res, next) => {
    try {
      const { productId } = req.params;
      const attributes = await this.repository.getProductAttributes(productId);
      return res.status(200).json({
        message: `Attributes for product ${productId} retrieved successfully`,
        attributes,
      });
    } catch (error) {
      return next(error);
    }
  };
}

export default new ProductController();

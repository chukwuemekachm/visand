import ShippingRepository from '../repositories/ShippingRepository';

class ShippingController {
  constructor() {
    this.repository = ShippingRepository;
  }

  getAllShippingRegions = async (req, res, next) => {
    try {
      const shippingRegions = await this.repository.getShippingRegions();
      return res.status(200).json({
        message: 'Shipping regions retrieved successfully',
        shippingRegions,
      });
    } catch (error) {
      return next(error);
    }
  }

  getAllShippingTypes = async (req, res, next) => {
    try {
      const shippingTypes = await this.repository.getShippingTypes();
      return res.status(200).json({
        message: 'Shipping types retrieved successfully',
        shippingTypes,
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default new ShippingController();

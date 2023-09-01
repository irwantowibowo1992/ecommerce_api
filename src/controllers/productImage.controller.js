const ProductImageService = require('../services/productImage.service');
const SuccessResult = require('../utils/response.util');

class ProductImageController {
  async getAllProductImage(req, res) {
    const data = await ProductImageService.getAllProductImage();

    SuccessResult.make(res).sendWithHumps(data);
  }
}

module.exports = new ProductImageController();

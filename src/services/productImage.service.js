const ProductImageModel = require('../models/productImage.model');

class ProductService {
  async getAllProductImage() {
    return await ProductImageModel.query().select();
  }
}

module.exports = new ProductService();

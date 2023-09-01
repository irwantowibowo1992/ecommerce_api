const ProductService = require('../services/product.service');
const SuccessResult = require('../utils/response.util');

class ProductController {
  async getAllProducts(req, res) {
    const data = await ProductService.getAllProducts();
    SuccessResult.make(res).sendWithHumps(data);
  }

  async addNewProduct(req, res) {
    const body = req.body;
    await ProductService.addNewProduct(body);
    SuccessResult.make(res).sendMessage('Data berhasil ditambahkan');
  }

  async getDetailProduct(req, res) {
    const { id } = req.params;
    const data = await ProductService.getDetailProduct(id);
    SuccessResult.make(res).sendData(data);
  }
}

module.exports = new ProductController();

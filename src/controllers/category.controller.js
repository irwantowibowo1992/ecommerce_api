const CategoryService = require('../services/category.service');
const SuccessResult = require('../utils/response.util');

class CategoryController {
  async getAllCategories(req, res) {
    const data = await CategoryService.getAllCategories();

    SuccessResult.make(res).sendWithHumps(data);
  }

  async addNewCategory(req, res) {
    const body = req.body;

    await CategoryService.addNewCategory(body);
    SuccessResult.make(res).sendMessage('Data berhasil ditambahkan');
  }

  async getDetailCategory(req, res) {
    const { id } = req.params;
    const data = await CategoryService.getDetailCategory(id);
    SuccessResult.make(res).sendData(data);
  }

  async updateCategory(req, res) {
    const { id } = req.params;
    const body = req.body;
    await CategoryService.updateCategory(id, body);
    SuccessResult.make(res).sendMessage('Data berhasil diupdate');
  }

  async deleteCategory(req, res) {
    const { id } = req.params;
    await CategoryService.deleteCategory(id);
    SuccessResult.make(res).sendMessage('Data berhasil dihapus');
  }
}

module.exports = new CategoryController();

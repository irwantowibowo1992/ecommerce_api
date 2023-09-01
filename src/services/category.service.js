const CategoryModel = require('../models/category.model');
const NotFoundError = require('../exceptions/notFound.exception');

class CategoryService {
  async getAllCategories(data) {
    return await CategoryModel.query().select().whereNotDeleted();
  }

  async addNewCategory(data) {
    return await CategoryModel.query().insert({
      name: data.name,
    });
  }

  async getDetailCategory(id) {
    const data = await CategoryModel.query().select().findById(id);
    if (!data) {
      throw new NotFoundError('Data not found');
    }
    return data;
  }

  async updateCategory(id, data) {
    const dataPrevious = await CategoryModel.query().select().findById(id);
    if (!dataPrevious) {
      throw new NotFoundError('Data not found');
    }

    dataPrevious.name = data.name;

    return await dataPrevious.$query().patch();
  }

  async deleteCategory(id) {
    const dataPrevious = await CategoryModel.query().select().findById(id);
    if (!dataPrevious) {
      throw new NotFoundError('Data not found');
    }

    return await dataPrevious.$query().delete();
  }
}

module.exports = new CategoryService();

const slug = require('slugify');
const ProductModel = require('../models/product.model');
const ProductImageModel = require('../models/productImage.model');
const { generateRandomString } = require('../utils/string.util');
const NotFoundError = require('../exceptions/notFound.exception');

class ProductService {
  async getAllProducts() {
    return await ProductModel.query().select();
  }

  async addNewProduct(data) {
    await ProductModel.transaction(async (trx) => {
      const dataInsert = await ProductModel.query(trx).insertAndFetch({
        name: data.name,
        slug: slug(data.name),
        description: data.description,
        sku: generateRandomString(6),
        price: data.price,
        category_id: data.categoryId,
        brand_id: data.brandId,
      });

      const dataImageProduct = [];

      for (const element of data.images) {
        dataImageProduct.push({
          product_id: dataInsert.id,
          image: element.image,
        });
      }

      console.log(dataImageProduct);

      await ProductImageModel.query(trx).insertGraph(dataImageProduct);
    });
  }

  async getDetailProduct(id) {
    const data = await ProductModel.query()
      .select(
        'p.id as product_id',
        'p.name as product_name',
        'p.sku',
        'p.price',
        'p.slug',
        'p.in_stock',
        'p.description',
        'c.name as category',
        'b.name as brand'
      )
      .alias('p')
      .leftJoin({ c: 'categories' }, (join) => {
        join.on('p.category_id', 'c.id');
      })
      .leftJoin({ b: 'brands' }, (join) => {
        join.on('p.brand_id', 'b.id');
      })
      .findById(id);

    if (!data) {
      throw new NotFoundError('Data not found');
    }

    return data;
  }
}

module.exports = new ProductService();

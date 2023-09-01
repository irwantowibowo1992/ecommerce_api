const { Model } = require('objection');
const objectionSoftDelete = require('objection-js-soft-delete');
const Knex = require('knex');
const knexConfig = require('../../knexfile');

const knex = Knex(knexConfig[process.env.NODE_ENV || 'development']);
Model.knex(knex);

const softDelete = objectionSoftDelete.default({
  columnName: 'deleted_at',
  deletedValue: new Date(),
  notDeletedValue: null,
});

class ProductImage extends softDelete(Model) {
  static get tableName() {
    return 'product_images';
  }

  async $beforeInsert() {
    this.created_at = await new Date().toISOString();
  }

  async $beforeUpdate() {
    this.updated_at = await new Date().toISOString();
  }

  static column = {
    id: `${this.tableName}.id`,
    image: `${this.tableName}.image`,
    product_id: `${this.tableName}.product_id`,
    created_at: `${this.tableName}.created_at`,
    updated_at: `${this.tableName}.updated_at`,
    deleted_at: `${this.tableName}.deleted_at`,
  };
}

module.exports = ProductImage;

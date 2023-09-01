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

class Product extends softDelete(Model) {
  static get tableName() {
    return 'products';
  }

  async $beforeInsert() {
    this.created_at = await new Date().toISOString();
  }

  async $beforeUpdate() {
    this.updated_at = await new Date().toISOString();
  }

  static column = {
    id: `${this.tableName}.id`,
    name: `${this.tableName}.name`,
    slug: `${this.tableName}.slug`,
    description: `${this.tableName}.description`,
    category_id: `${this.tableName}.category_id`,
    in_stock: `${this.tableName}.in_stock`,
    created_at: `${this.tableName}.created_at`,
    updated_at: `${this.tableName}.updated_at`,
    deleted_at: `${this.tableName}.deleted_at`,
    brand_id: `${this.tableName}.brand_id`,
  };
}

module.exports = Product;

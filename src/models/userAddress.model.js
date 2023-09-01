const { Model } = require('objection');
const Knex = require('knex');
const knexConfig = require('../../knexfile');

const knex = Knex(knexConfig[process.env.NODE_ENV || 'development']);
Model.knex(knex);

class UserAddress extends Model {
  static get tableName() {
    return 'user_address';
  }

  async $beforeInsert() {
    this.created_at = await new Date().toISOString();
  }

  async $beforeUpdate() {
    this.updated_at = await new Date().toISOString();
  }

  static column = {
    id: `${this.tableName}.id`,
    user_id: `${this.tableName}.first_name`,
    address: `${this.tableName}.address`,
    city: `${this.tableName}.city`,
    province: `${this.tableName}.province`,
    postal_code: `${this.tableName}.postal_code`,
    telephone: `${this.tableName}.telephone`,
    mobile: `${this.tableName}.mobile`,
    created_at: `${this.tableName}.created_at`,
    updated_at: `${this.tableName}.updated_at`,
    deleted_at: `${this.tableName}.deleted_at`,
  };
}

module.exports = UserAddress;

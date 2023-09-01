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

class UserRole extends softDelete(Model) {
  static get tableName() {
    return 'user_role';
  }

  static column = {
    id: `${this.tableName}.id`,
    user_id: `${this.tableName}.user_id`,
    role: `${this.tableName}.role`,
  };
}

module.exports = UserRole;

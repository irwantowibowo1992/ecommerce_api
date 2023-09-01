/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.alterTable('products', (table) => {
    table
      .uuid('brand_id')
      .references('id')
      .inTable('brands')
      .onUpdate('cascade')
      .onDelete('cascade');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  return knex.schema.alterTable('products', (table) => {
    table.dropColumn('brand_id');
  });
};

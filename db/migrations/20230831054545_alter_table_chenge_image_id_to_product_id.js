/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.alterTable('product_images', (table) => {
    table.renameColumn('image_id', 'product_id');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  return knex.schema.alterTable('product_images', (table) => {
    table.renameColumn('product_id', 'image_id');
  });
};

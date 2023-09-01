/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.raw('DROP TYPE IF EXISTS "stockstatus";');
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await knex.schema.createTable('products', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('name').notNullable();
    table.string('slug').notNullable();
    table.text('description');
    table.string('sku').notNullable();
    table.integer('price');
    table
      .uuid('category_id')
      .references('id')
      .inTable('categories')
      .onUpdate('cascade')
      .onDelete('cascade');
    table
      .enu('in_stock', [true, false], {
        useNative: true,
        enumName: 'stockstatus',
      })
      .defaultTo(true);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  return knex.schema.dropTableIfExists('products');
};

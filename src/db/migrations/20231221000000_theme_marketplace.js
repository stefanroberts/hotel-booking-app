/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  // Theme marketplace tables
  await knex.schema.createTable('themes', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(lower(hex(randomblob(4))) || lower(hex(randomblob(2))) || "4" || substr(lower(hex(randomblob(2))),2) || lower(hex(randomblob(6))))'));
    table.string('name').notNullable();
    table.text('description');
    table.decimal('price', 10, 2).notNullable();
    table.uuid('authorId').references('id').inTable('users').onDelete('CASCADE');
    table.json('files').notNullable(); // Store theme files structure
    table.boolean('isPublished').defaultTo(false);
    table.timestamps(true, true);
  });

  await knex.schema.createTable('theme_purchases', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(lower(hex(randomblob(4))) || lower(hex(randomblob(2))) || "4" || substr(lower(hex(randomblob(2))),2) || lower(hex(randomblob(6))))'));
    table.uuid('themeId').references('id').inTable('themes').onDelete('CASCADE');
    table.uuid('userId').references('id').inTable('users').onDelete('CASCADE');
    table.string('transactionId');
    table.timestamps(true, true);
  });

  // Add custom domain field to properties
  await knex.schema.alterTable('properties', (table) => {
    table.string('customDomain').unique();
    table.boolean('customDomainVerified').defaultTo(false);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.alterTable('properties', (table) => {
    table.dropColumn('customDomain');
    table.dropColumn('customDomainVerified');
  });
  await knex.schema.dropTable('theme_purchases');
  await knex.schema.dropTable('themes');
}
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(lower(hex(randomblob(4))) || lower(hex(randomblob(2))) || "4" || substr(lower(hex(randomblob(2))),2) || lower(hex(randomblob(6))))'));
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.string('name').notNullable();
    table.timestamps(true, true);
  });

  await knex.schema.createTable('properties', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(lower(hex(randomblob(4))) || lower(hex(randomblob(2))) || "4" || substr(lower(hex(randomblob(2))),2) || lower(hex(randomblob(6))))'));
    table.string('name').notNullable();
    table.string('domain').unique();
    table.string('theme').defaultTo('default');
    table.uuid('userId').references('id').inTable('users').onDelete('CASCADE');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('rooms', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(lower(hex(randomblob(4))) || lower(hex(randomblob(2))) || "4" || substr(lower(hex(randomblob(2))),2) || lower(hex(randomblob(6))))'));
    table.string('name').notNullable();
    table.text('description');
    table.decimal('price', 10, 2).notNullable();
    table.uuid('propertyId').references('id').inTable('properties').onDelete('CASCADE');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('bookings', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(lower(hex(randomblob(4))) || lower(hex(randomblob(2))) || "4" || substr(lower(hex(randomblob(2))),2) || lower(hex(randomblob(6))))'));
    table.datetime('startDate').notNullable();
    table.datetime('endDate').notNullable();
    table.string('guestName').notNullable();
    table.string('guestEmail').notNullable();
    table.uuid('roomId').references('id').inTable('rooms').onDelete('CASCADE');
    table.uuid('propertyId').references('id').inTable('properties').onDelete('CASCADE');
    table.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('bookings');
  await knex.schema.dropTable('rooms');
  await knex.schema.dropTable('properties');
  await knex.schema.dropTable('users');
}
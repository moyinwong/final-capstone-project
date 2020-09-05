import * as Knex from "knex";

const usersTable = "users";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(usersTable, (table) => {
    table.increments();
    table.string("username").notNullable().unique();
    table.string("password").notNullable();
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(usersTable);
}

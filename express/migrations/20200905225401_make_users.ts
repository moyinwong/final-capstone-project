import * as Knex from "knex";

const usersTable = "users";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(usersTable, (table) => {
    table.increments();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.string("image");
    table.boolean("is_tutor");
    table.string("title");
    table.text("introduction");
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(usersTable);
}

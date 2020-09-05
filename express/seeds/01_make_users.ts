import * as Knex from "knex";
import { tables } from "../tables";

const usersTable = tables.USERS;

import { hashPassword } from "../hash";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(usersTable).del();

  const hashedPassword = await hashPassword("1234");

  // Inserts seed entries
  await knex(usersTable).insert([
    { id: 1, username: "Apple", password: hashedPassword },
    { id: 2, username: "Banana", password: hashedPassword },
  ]);
}

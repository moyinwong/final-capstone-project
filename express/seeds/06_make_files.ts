import * as Knex from "knex";
import { tables } from "../tables";

const filesTable = tables.FILES;

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(filesTable).del();

  // Inserts seed entries
  await knex(filesTable).insert([
    {
      name: "2017-DSE-CH-LANG-1-AB.pdf",
      lesson_id: 1,
    },
    {
      name: "2017-DSE-CH-LANG-1-RP.pdf",
      lesson_id: 1,
    },
  ]);
}

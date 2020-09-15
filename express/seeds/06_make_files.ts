import * as Knex from "knex";
import { tables } from "../tables";

const filesTable = tables.FILES;

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(filesTable).del();

  // Inserts seed entries
  await knex(filesTable).insert([
    {
      name: "test1.pdf",
      lesson_id: 1,
    },
    {
      name: "test2.pdf",
      lesson_id: 2,
    },
    {
      name: "test3.pdf",
      lesson_id: 3,
    },
  ]);
}

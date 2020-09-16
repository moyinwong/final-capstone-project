import * as Knex from "knex";
import { tables } from "../tables";

const subCategoriesTable = tables.SUBCATEGORIES;

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(subCategoriesTable).del();

  // Inserts seed entries
  await knex(subCategoriesTable).insert([
    { name: "編程", category_id: 15 },
    { name: "廚藝", category_id: 15 },
    { name: "DIY", category_id: 15 },
    { name: "美容", category_id: 15 },
  ]);
}

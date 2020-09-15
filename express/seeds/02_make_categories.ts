import * as Knex from "knex";
import { tables } from "../tables";

const categoriesTable = tables.CATEGORIES;

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(categoriesTable).del();

  // Inserts seed entries
  await knex(categoriesTable).insert([
    { name: "中文" },
    { name: "英文" },
    { name: "數學" },
    { name: "通識" },
    { name: "物理" },
    { name: "化學" },
    { name: "生物" },
    { name: "經濟" },
    { name: "歷史" },
    { name: "企會財" },
    { name: "ICT" },
    { name: "視覺藝術" },
    { name: "M1" },
    { name: "M2" },
    { name: "其他" },
  ]);
}

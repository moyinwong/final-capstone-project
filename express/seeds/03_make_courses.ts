import * as Knex from "knex";
import { tables } from "../tables";

const coursesTable = tables.COURSES;

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(coursesTable).del();

  // Inserts seed entries
  await knex(coursesTable).insert([
    {
      name: "DSE 中文 5* 攻略",
      price: 99,
      category_id: "1",
      tutor_id: 3,
      description: "DSE中文卷一由2升到5*",
      objective: "幫助提升中文",
      prerequisites: "DSE 準考生",
    },
  ]);
}

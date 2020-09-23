import * as Knex from "knex";
import { tables } from "../tables";

const questionsTable = tables.QUESTIONS;

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(questionsTable).del();

  // Inserts seed entries
  await knex(questionsTable).insert([
    {
      question: "中文考試最重要係咩呢？",
      lesson_id: 1,
      is_MC: true,
    },
    {
      question: "用紅外線定收音機比較好？",
      lesson_id: 1,
      is_MC: true,
    },
    {
      question: "聆聽難唔難？",
      lesson_id: 1,
      is_MC: true,
    },
  ]);
}

import * as Knex from "knex";
import { tables } from "../tables";

const mcAnswersTable = tables.MC_ANSWERS;

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(mcAnswersTable).del();

  // Inserts seed entries
  await knex(mcAnswersTable).insert([
    {
      question_id: 1,
      answer_body: "勇氣",
      is_correct_answer: false,
    },
    {
      question_id: 1,
      answer_body: "IQ",
      is_correct_answer: false,
    },
    {
      question_id: 1,
      answer_body: "中文水平",
      is_correct_answer: true,
    },
    {
      question_id: 2,
      answer_body: "紅外線",
      is_correct_answer: true,
    },
    {
      question_id: 2,
      answer_body: "收音機",
      is_correct_answer: false,
    },
    {
      question_id: 3,
      answer_body: "難",
      is_correct_answer: false,
    },
    {
      question_id: 3,
      answer_body: "唔難",
      is_correct_answer: true,
    },
  ]);
}

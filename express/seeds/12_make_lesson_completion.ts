import * as Knex from "knex";
import { tables } from "../tables";

const lessonCompletionTable = tables.LESSON_COMPLETION;

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(lessonCompletionTable).del();

  // Inserts seed entries
  await knex(lessonCompletionTable).insert([
      {
          user_id: 3,
          lesson_id: 8,
          course_id: 3,
      },
      {
          user_id: 3,
          lesson_id: 9,
          course_id: 3,

      },
      {
          user_id: 3,
          lesson_id: 10,
          course_id: 3,
      },
  ])
}

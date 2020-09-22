import * as Knex from "knex";
import { tables } from "../tables";

const purchasedCoursesTable = tables.PURCHASED_COURSES;

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(purchasedCoursesTable).del();

  // Inserts seed entries
  await knex(purchasedCoursesTable).insert([
    {
      user_id: 1,
      course_id: 1,
      payment_method: "credit card",
      paid_amount: 99,
      rated_score: 4.5,
      comment: "教得十分仔細！",
    },
    {
      user_id: 2,
      course_id: 1,
      payment_method: "credit card",
      paid_amount: 99,
      rated_score: 3,
      comment: "清楚易明，但仍有需要改善的地方",
    },
    {
      user_id: 2,
      course_id: 2,
      payment_method: "credit card",
      paid_amount: 199,
      rated_score: 5,
      comment: "excellent course ever!!!",
    },
  ]);
}

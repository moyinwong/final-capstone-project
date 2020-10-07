import * as Knex from "knex";
import { tables } from "../tables";
import faker from 'faker';

faker.locale = "en"

const purchasedCoursesTable = tables.PURCHASED_COURSES;
const randomPurchasedCourseList: any[] = [];

export async function seed(knex: Knex): Promise<void> {

  //generate random purchased_course
  for (let i = 0; i < 1000; i++) {
    const randomUserId: number = Math.floor(Math.random() * 99) + 1;
    const randomCourseId: number = Math.floor(Math.random() * 299) + 1;
    const randomPaidAmount: number = Math.floor(Math.random() * 100)
    const randomRating: number = Math.floor(Math.random() * 5) + 1
    const randomObj: any = {
      user_id: randomUserId,
      course_id: randomCourseId,
      payment_method: 'credit card',
      paid_amount: randomPaidAmount,
      rated_score: randomRating,
      comment: faker.commerce.productAdjective()
    };

    randomPurchasedCourseList.push(randomObj);
  }

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
      user_id: 10,
      course_id: 1,
      payment_method: "credit card",
      paid_amount: 99,
      rated_score: 5,
      comment: "教得好好！",
    },
    {
      user_id: 9,
      course_id: 1,
      payment_method: "credit card",
      paid_amount: 99,
      rated_score: 5,
      comment: "老師有耐性！",
    },
    {
      user_id: 2,
      course_id: 1,
      payment_method: "credit card",
      paid_amount: 99,
      rated_score: 5,
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
  ].concat(randomPurchasedCourseList));
}

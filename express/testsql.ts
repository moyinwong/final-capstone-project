import Knex from "knex";
const knexConfig = require("./knexfile");
const knex = Knex(knexConfig["development"]);

import { tables } from "./tables";

const testKnex = knex
  .select(
    "courses.id as course_id",
    "courses.name as course_name",
    "courses.tutor_id",
    "lessons.id as lesson_id",
    "lessons.name as lesson_name",
    "lessons.description as lesson_description",
    "is_trial",
    "video_url",
    "users.email as user_email"
  )
  .from(tables.COURSES)
  .leftJoin(
    tables.PURCHASED_COURSES,
    `${tables.COURSES}.id`,
    `${tables.PURCHASED_COURSES}.course_id`
  )
  .leftJoin(
    tables.USERS,
    `${tables.PURCHASED_COURSES}.user_id`,
    `${tables.USERS}.id`
  )
  .innerJoin(
    tables.LESSONS,
    `${tables.COURSES}.id`,
    `${tables.LESSONS}.course_id`
  )
  .where("users.email", "apple@abc.com")
  .andWhere("courses.name", "DSE 中文 5* 攻略");

const test = async () => {
  return testKnex.toSQL();
};

console.log(test());

(async () => {
  const func = await testKnex;

  console.log(func);
})();

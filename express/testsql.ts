import Knex from "knex";
const knexConfig = require("./knexfile");
const knex = Knex(knexConfig["development"]);

import { tables } from "./tables";

const testKnex = knex
  .select(
    "courses.id as course_id",
    "courses.name as course_name",
    "lessons.id as lesson_id",
    "lessons.name as lesson_name",
    "lessons.description as lesson_description",
    "is_trial",
    "video_url"
  )
  .from(tables.COURSES)
  .leftJoin("lessons", `${tables.COURSES}.id`, `lessons.course_id`)
  .where(`${tables.COURSES}.name`, "DSE 中文 5* 攻略");

const test = async () => {
  return testKnex.toSQL();
};

console.log(test());

(async () => {
  const func = await testKnex;

  console.log(func);
})();

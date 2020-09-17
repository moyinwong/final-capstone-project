import Knex from "knex";
const knexConfig = require("./knexfile");
const knex = Knex(knexConfig["development"]);

import { tables } from "./tables";

const testKnex = knex
  .with(
    "T1",
    knex
      .select(
        "courses.name as course_name",
        "courses.objective",
        "courses.prerequisites",
        "courses.price",
        "courses.id",
        "category_id",
        "users.name as tutor_name",
        "courses.image"
      )
      .avg("rated_score")
      //.count("lessons.id")
      .from(tables.PURCHASED_COURSES)
      .rightJoin(
        "courses",
        "courses.id",
        `${tables.PURCHASED_COURSES}.course_id`
      )
      .leftJoin("users", "users.id", `${tables.COURSES}.tutor_id`)
      .groupBy(
        "courses.name",
        "courses.objective",
        "courses.prerequisites",
        "courses.price",
        "courses.id",
        "category_id",
        "users.name",
        "courses.image"
      )
  )
  .select(
    "course_name",
    "objective",
    "prerequisites",
    "price",
    "T1.id",
    "category_id",
    "avg",
    "tutor_name",
    "image"
  )
  .count("lessons.id", { as: "lessons_number" })
  .from("T1")
  .innerJoin("lessons", "T1.id", "lessons.course_id")
  .groupBy(
    "course_name",
    "objective",
    "prerequisites",
    "price",
    "T1.id",
    "category_id",
    "avg",
    "tutor_name",
    "image"
  )
  .where("category_id", 1);
//.innerJoin("lessons", "courses.id", "lessons.course_id");
//.where("courses.category_id", 1);

const test = async () => {
  return testKnex.toSQL();
};

console.log(test());

(async () => {
  const func = await testKnex;

  console.log(func);
})();

import Knex from "knex";
const knexConfig = require("./knexfile");
const knex = Knex(knexConfig["development"]);

import { tables } from "./tables";

const testKnex = knex
  .select("users.email as user_email", "courses.name as course_name")
  .from(tables.USERS)
  .leftJoin(
    tables.PURCHASED_COURSES,
    "users.id",
    `${tables.PURCHASED_COURSES}.user_id`
  )
  .leftJoin(tables.COURSES, "course_id", `${tables.COURSES}.id`)
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

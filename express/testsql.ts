import Knex from "knex";
const knexConfig = require("./knexfile");
const knex = Knex(knexConfig["development"]);

import { tables } from "./tables";

const testKnex = knex
  .select("*")
  .from(tables.PURCHASED_COURSES)
  .leftJoin(
    tables.COURSES,
    `${tables.PURCHASED_COURSES}.course_id`,
    `${tables.COURSES}.id`
  )
  .leftJoin(
    tables.USERS,
    `${tables.PURCHASED_COURSES}.user_id`,
    `${tables.USERS}.id`
  )
  .where(`${tables.COURSES}.name`, "DSE 中文 5* 攻略")
  .andWhere(`${tables.USERS}.email`, "apple@abc.com")
  .limit(1);

const test = async () => {
  return testKnex.toSQL();
};

console.log(test());

(async () => {
  const func = await testKnex;

  console.log(func);
})();

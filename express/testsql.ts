import Knex from "knex";
const knexConfig = require("./knexfile");
const knex = Knex(knexConfig["development"]);

import { tables } from "./tables";

const testKnex = knex
  .select(
    `${tables.QUESTIONS}.question`,
    `${tables.MC_ANSWERS}.answer_body`,
    `${tables.MC_ANSWERS}.is_correct_answer`
  )
  .from(`${tables.LESSONS}`)
  .rightJoin(
    `${tables.QUESTIONS}`,
    `${tables.LESSONS}.id`,
    `${tables.QUESTIONS}.lesson_id`
  )
  .rightJoin(
    `${tables.MC_ANSWERS}`,
    `${tables.QUESTIONS}.id`,
    `${tables.MC_ANSWERS}.question_id`
  )
  .where(
    `${tables.LESSONS}.name`,
    "我當時用收音機考試聽唔到？｜用紅外線考好過收音機？"
  )
  .andWhere(`${tables.MC_ANSWERS}.is_correct_answer`, true);

const test = async () => {
  return testKnex.toSQL();
};

console.log(test());

(async () => {
  const func = await testKnex;

  console.log(func);
})();

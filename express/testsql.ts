import Knex from "knex";
const knexConfig = require("./knexfile");
const knex = Knex(knexConfig["development"]);

import { tables } from "./tables";

const testKnex = knex
  .select(
    `discussion_id`,
    `${tables.THREADS}.id as threads_id`,
    `${tables.DISCUSSIONS}.topic as topic`,
    `${tables.DISCUSSIONS}.content as discussion_content`,
    `${tables.THREADS}.content as thread.content`
  )
  .from(`${tables.DISCUSSIONS}`)
  .rightJoin(
    `${tables.THREADS}`,
    `${tables.DISCUSSIONS}.id`,
    `${tables.THREADS}.discussion_id`
  )
  .where(`${tables.DISCUSSIONS}.lesson_id`, 1);

const test = async () => {
  return testKnex.toSQL();
};

console.log(test());

(async () => {
  const func = await testKnex;

  console.log(func);
})();

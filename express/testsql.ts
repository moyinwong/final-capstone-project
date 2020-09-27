import Knex from "knex";
const knexConfig = require("./knexfile");
const knex = Knex(knexConfig["development"]);

import { tables } from "./tables";

const testKnex = knex
  .select(`${tables.USERS}.stripe_id`)
  .from(`${tables.USERS}`)
  .where(`${tables.USERS}.name`, "teacher01")
  .limit(1);

const test = async () => {
  return testKnex.toSQL();
};

console.log(test());

(async () => {
  const func = await testKnex;

  console.log(func);
})();

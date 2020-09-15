import Knex from "knex";
const knexConfig = require("./knexfile");
const knex = Knex(knexConfig["development"]);

import { tables } from "./tables";

const test = async () => {
  return knex
    .table(tables.PURCHASED_COURSES)
    .select(`${tables.COURSES}.name`)
    .count(`${tables.COURSES}.id`)
    .innerJoin("courses", "courses.id", `${tables.PURCHASED_COURSES}.course_id`)
    .groupBy(`${tables.COURSES}.id`)
    .toSQL();
};

console.log(test());

import * as Knex from "knex";
import { tables } from "../tables";

const usersTable = tables.USERS;
const categoriesTable = tables.CATEGORIES;
const coursesTable = tables.COURSES;
const purchasedCoursesTable = tables.PURCHASED_COURSES;
const lessonsTable = tables.LESSONS;
const filesTable = tables.FILES;
const questionsTable = tables.QUESTIONS;
const mcAnswersTable = tables.MC_ANSWERS;
const submissionsTable = tables.SUBMISSIONS;
const savedAnswersTable = tables.SAVED_ANSWERS;

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(usersTable, (table) => {
    table.increments();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.string("name").notNullable();
    table.string("image");
    table.string("linkedin");
    table.string("google_id");
    table.string("facebook_id");
    table.boolean("is_tutor");
    table.string("title");
    table.text("introduction");
    table.timestamps(false, true);
  });

  await knex.schema.createTable(categoriesTable, (table) => {
    table.increments();
    table.string("name").notNullable().unique();
    table.timestamps(false, true);
  });

  await knex.schema.createTable(coursesTable, (table) => {
    table.increments();
    table.string("name").notNullable().unique();
    table.decimal("price").notNullable();
    table.string("image");
    table
      .integer("category_id")
      .references("id")
      .inTable("categories")
      .notNullable();
    table.integer("tutor_id").references("id").inTable("users").notNullable();
    table.text("description");
    table.text("objective");
    table.text("prerequisites");
    table.timestamps(false, true);
  });

  await knex.schema.createTable(purchasedCoursesTable, (table) => {
    table.increments();
    table.integer("user_id").references("id").inTable("users").notNullable();
    table
      .integer("course_id")
      .references("id")
      .inTable("courses")
      .notNullable();
    table.string("payment_method");
    table.decimal("paid_amount");
    table.integer("rated_score");
    table.text("comment");
    table.timestamps(false, true);
  });

  await knex.schema.createTable(lessonsTable, (table) => {
    table.increments();
    table.string("name").notNullable().unique();
    table.text("description");
    table.boolean("is_trial");
    table.string("video_url");
    table
      .integer("course_id")
      .references("id")
      .inTable("courses")
      .notNullable();
    table.timestamps(false, true);
  });

  await knex.schema.createTable(filesTable, (table) => {
    table.increments();
    table.string("name").notNullable().unique();
    table
      .integer("lesson_id")
      .references("id")
      .inTable("lessons")
      .notNullable();
    table.timestamps(false, true);
  });

  await knex.schema.createTable(questionsTable, (table) => {
    table.increments();
    table.text("question");
    table.text("answer");
    table.boolean("is_MC").notNullable();
    table
      .integer("lesson_id")
      .references("id")
      .inTable("lessons")
      .notNullable();
    table.timestamps(false, true);
  });

  await knex.schema.createTable(mcAnswersTable, (table) => {
    table.increments();
    table
      .integer("question_id")
      .references("id")
      .inTable("questions")
      .notNullable();
    table.string("answer_body");
    table.boolean("is_correct_answer");
    table.timestamps(false, true);
  });

  await knex.schema.createTable(submissionsTable, (table) => {
    table.increments();
    table.integer("user_id").references("id").inTable("users").notNullable();
    table
      .integer("lesson_id")
      .references("id")
      .inTable("lessons")
      .notNullable();
    table.decimal("score");
    table.timestamps(false, true);
  });

  await knex.schema.createTable(savedAnswersTable, (table) => {
    table
      .integer("question_id")
      .references("id")
      .inTable("questions")
      .notNullable();
    table
      .integer("submission_id")
      .references("id")
      .inTable("submissions")
      .notNullable();
    table.text("submitted_answer");
    table.text("submitted_mc_answer");
    table.boolean("is_done");
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(savedAnswersTable);
  await knex.schema.dropTable(submissionsTable);
  await knex.schema.dropTable(mcAnswersTable);
  await knex.schema.dropTable(questionsTable);
  await knex.schema.dropTable(filesTable);
  await knex.schema.dropTable(lessonsTable);
  await knex.schema.dropTable(purchasedCoursesTable);
  await knex.schema.dropTable(coursesTable);
  await knex.schema.dropTable(categoriesTable);
  await knex.schema.dropTable(usersTable);
}

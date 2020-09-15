import * as Knex from "knex";

const usersTable = "users";
const categoriesTable = "categories";
const coursesTable = "courses";
const purchasedCoursesTable = "purchased_courses_table";
const lessonsTable = "lessons";
const filesTable = "files";
const questionsTable = "questions";
const submissionsTable = "submissions";
const savedAnswersTable = "saved_answers";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(usersTable, (table) => {
    table.increments();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.string("image");
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
    table.string("name").notNullable().unique();
    table.text("body");
    table.text("answer");
    table
      .integer("lesson_id")
      .references("id")
      .inTable("lessons")
      .notNullable();
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
    table.boolean("is_correct");
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(savedAnswersTable);
  await knex.schema.dropTable(submissionsTable);
  await knex.schema.dropTable(questionsTable);
  await knex.schema.dropTable(filesTable);
  await knex.schema.dropTable(lessonsTable);
  await knex.schema.dropTable(purchasedCoursesTable);
  await knex.schema.dropTable(coursesTable);
  await knex.schema.dropTable(categoriesTable);
  await knex.schema.dropTable(usersTable);
}

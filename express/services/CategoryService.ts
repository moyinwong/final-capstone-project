import Knex from "knex";
import { tables } from "../tables";
import { ICategory } from "./models";

export class CategoryService {
  constructor(private knex: Knex) {}

  getCoursesByCategory = async (categoryName: string) => {
    if (categoryName === "all") {
      const courses = await this.knex
        .with(
          "T1",
          this.knex
            .select(
              "courses.name as course_name",
              "courses.objective",
              "courses.description as course_description",
              "courses.prerequisites",
              "courses.price",
              "courses.id",
              "category_id",
              "users.name as tutor_name",
              "courses.image"
            )
            .count("purchased_courses.user_id", { as: "purchased_users_num" })
            .count("rated_score", { as: "rated_num" })
            .avg("rated_score", { as: "rated_score" })
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
              "courses.description",
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
          "course_description",
          "prerequisites",
          "price",
          "T1.id",
          "category_id",
          "purchased_users_num",
          "rated_num",
          "rated_score",

          "tutor_name",
          "image"
        )
        .count("lessons.id", { as: "lessons_number" })
        .from("T1")
        .innerJoin("lessons", "T1.id", "lessons.course_id")
        .groupBy(
          "course_name",
          "objective",
          "course_description",
          "prerequisites",
          "price",
          "T1.id",
          "category_id",
          "purchased_users_num",
          "rated_num",
          "rated_score",
          "tutor_name",
          "image"
        );

      return courses;
    }

    if (categoryName === "其他") {
      const courses = await this.knex
        .with(
          "T1",
          this.knex
            .select(
              "courses.name as course_name",
              "courses.objective",
              "courses.description as course_description",
              "courses.prerequisites",
              "courses.price",
              "courses.id",
              "category_id",
              "users.name as tutor_name",
              "courses.image"
            )
            .count("purchased_courses.user_id", { as: "purchased_users_num" })
            .count("rated_score", { as: "rated_num" })
            .avg("rated_score", { as: "rated_score" })
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
              "courses.description",
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
          "course_description",
          "prerequisites",
          "price",
          "T1.id",
          "category_id",
          "purchased_users_num",
          "rated_num",
          "rated_score",

          "tutor_name",
          "image"
        )
        .count("lessons.id", { as: "lessons_number" })
        .from("T1")
        .innerJoin("lessons", "T1.id", "lessons.course_id")
        .groupBy(
          "course_name",
          "objective",
          "course_description",
          "prerequisites",
          "price",
          "T1.id",
          "category_id",
          "purchased_users_num",
          "rated_num",
          "rated_score",
          "tutor_name",
          "image"
        )
        .where("category_id", 15);

      return courses;
    }

    const category: ICategory = (
      await this.knex(tables.CATEGORIES)
        .select("*")
        .where("name", categoryName)
        .limit(1)
    )[0];

    const courses = this.knex
      .with(
        "T1",
        this.knex
          .select(
            "courses.name as course_name",
            "courses.objective",
            "courses.description as course_description",
            "courses.prerequisites",
            "courses.price",
            "courses.id",
            "category_id",
            "users.name as tutor_name",
            "courses.image"
          )
          .count("purchased_courses.user_id", { as: "purchased_users_num" })
          .count("rated_score", { as: "rated_num" })
          .avg("rated_score", { as: "rated_score" })
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
            "courses.description",
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
        "course_description",
        "prerequisites",
        "price",
        "T1.id",
        "category_id",
        "purchased_users_num",
        "rated_num",
        "rated_score",

        "tutor_name",
        "image"
      )
      .count("lessons.id", { as: "lessons_number" })
      .from("T1")
      .innerJoin("lessons", "T1.id", "lessons.course_id")
      .groupBy(
        "course_name",
        "objective",
        "course_description",
        "prerequisites",
        "price",
        "T1.id",
        "category_id",
        "purchased_users_num",
        "rated_num",
        "rated_score",
        "tutor_name",
        "image"
      )
      .where("category_id", category.id);

    return courses;
  };

  getCoursesBySubcategory = async (subcategoryName: string) => {
    const result = await this.knex
      .select("id")
      .from(`${tables.SUBCATEGORIES}`)
      .where(`${tables.SUBCATEGORIES}.name`, subcategoryName)
      .limit(1);

    const subcategoryId = result[0].id;

    const courses = await this.knex
      .with(
        "T1",
        this.knex
          .select(
            "courses.name as course_name",
            "courses.objective",
            "courses.description as course_description",
            "courses.prerequisites",
            "courses.price",
            "courses.id",
            "category_id",
            "subcategory_id as subcategory_id",
            "users.name as tutor_name",
            "courses.image"
          )
          .count("purchased_courses.user_id", { as: "purchased_users_num" })
          .count("rated_score", { as: "rated_num" })
          .avg("rated_score", { as: "rated_score" })
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
            "courses.description",
            "courses.prerequisites",
            "courses.price",
            "courses.id",
            "category_id",
            "subcategory_id",
            "users.name",
            "courses.image"
          )
      )
      .select(
        "course_name",
        "objective",
        "course_description",
        "prerequisites",
        "price",
        "T1.id",
        "category_id",
        "subcategory_id",
        "purchased_users_num",
        "rated_num",
        "rated_score",

        "tutor_name",
        "image"
      )
      .count("lessons.id", { as: "lessons_number" })
      .from("T1")
      .innerJoin("lessons", "T1.id", "lessons.course_id")
      .groupBy(
        "course_name",
        "objective",
        "course_description",
        "prerequisites",
        "price",
        "T1.id",
        "category_id",
        "subcategory_id",
        "purchased_users_num",
        "rated_num",
        "rated_score",
        "tutor_name",
        "image"
      )
      .where("subcategory_id", subcategoryId);

    return courses;
  };
}

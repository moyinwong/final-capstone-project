import Knex from "knex";
import { tables } from "../tables";
import { ICategory } from "./models";

export class CategoryService {
  constructor(private knex: Knex) {}

  getCoursesByCategory = async (categoryName: string) => {
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
      .where("category_id", category.id);

    return courses;
  };

  getCoursesBySubcategory = async (subcategoryName: string) => {
    console.log(subcategoryName);
    const subcategory = (
      await this.knex(tables.SUBCATEGORIES)
        .select("*")
        .where("name", subcategoryName)
        .limit(1)
    )[0];

    const courses = this.knex(tables.COURSES)
      .select("*")
      .where("subcategory_id", subcategory.id);

    return courses;
  };
}

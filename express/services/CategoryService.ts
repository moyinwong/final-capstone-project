import Knex from "knex";
import { tables } from "../tables";
import { ICategory } from "./models";
// import { logger } from "../logger";

export class CategoryService {
  constructor(private knex: Knex) {}

  getCoursesByCategory = async (categoryName: string) => {
    const category: ICategory = (
      await this.knex(tables.CATEGORIES)
        .select("*")
        .where("name", categoryName)
        .limit(1)
    )[0];

    console.log(category.id);

    const courses = this.knex(tables.COURSES)
      .select("*")
      .where("category_id", category.id);

    return courses;
  };
}

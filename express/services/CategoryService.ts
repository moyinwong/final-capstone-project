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

    const courses = this.knex(tables.COURSES)
      .select("*")
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

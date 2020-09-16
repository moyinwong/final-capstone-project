import Knex from "knex";
import { tables } from "../tables";

// import { logger } from "../logger";

interface IPopularCourses {
  name: string;
  count: string;
}

export class CourseService {
  constructor(private knex: Knex) {}

  getMostPurchasedCourses = async () => {
    const courses: Array<IPopularCourses> = await this.knex
      .table(tables.PURCHASED_COURSES)
      .select(`${tables.COURSES}.name`)
      .count(`${tables.COURSES}.id`)
      .innerJoin(
        "courses",
        "courses.id",
        `${tables.PURCHASED_COURSES}.course_id`
      )
      .groupBy(`${tables.COURSES}.id`);
    courses.sort((a, b) => parseInt(b.count) - parseInt(a.count));

    return courses;
  };
}

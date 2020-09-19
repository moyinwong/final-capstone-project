import Knex from "knex";
import { tables } from "../tables";

// import { logger } from "../logger";

interface ILesson {
  course_name: string;
  lesson_id: number;
  lesson_name: string;
  lesson_description: string;
  is_trial: boolean;
  video_url: string;
}

export class LessonService {
  constructor(private knex: Knex) {}

  getLessonsByCourseName = async (course: string) => {
    const lessons: Array<ILesson> = await this.knex
      .select(
        "courses.id as course_id",
        "courses.name as course_name",
        "lessons.id as lesson_id",
        "lessons.name as lesson_name",
        "lessons.description as lesson_description",
        "is_trial",
        "video_url"
      )
      .from(tables.COURSES)
      .leftJoin("lessons", `${tables.COURSES}.id`, `lessons.course_id`)
      .where(`${tables.COURSES}.name`, course);

    return lessons;
  };
}

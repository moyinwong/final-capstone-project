import Knex from "knex";
import { tables } from "../tables";

// import { logger } from "../logger";

interface ILesson {
  course_id: number;
  course_name: string;
  tutor_id: number;
  lesson_id: number;
  lesson_name: string;
  lesson_description: string;
  is_trial: boolean;
  video_url: string;
  user_email?: string;
}

export class LessonService {
  constructor(private knex: Knex) {}

  getLessonSummaryByCourse = async (course: string) => {
    const lessons: Array<ILesson> = await this.knex
      .select(
        "courses.id as course_id",
        "courses.name as course_name",
        "courses.tutor_id",
        "lessons.id as lesson_id",
        "lessons.name as lesson_name",
        "lessons.description as lesson_description",
        "is_trial",
        "video_url"
      )
      .from(tables.COURSES)
      .innerJoin(
        tables.LESSONS,
        `${tables.COURSES}.id`,
        `${tables.LESSONS}.course_id`
      )
      .where("courses.name", course);

    return lessons;
  };

  getLessonSummaryByCourseAndUser = async (
    course: string,
    userEmail: string
  ) => {
    const lessons: Array<ILesson> = await this.knex
      .select(
        "courses.id as course_id",
        "courses.name as course_name",
        "courses.tutor_id",
        "lessons.id as lesson_id",
        "lessons.name as lesson_name",
        "lessons.description as lesson_description",
        "is_trial",
        "video_url",
        "users.email as user_email",
        "purchased_courses.comment"
      )
      .from(tables.COURSES)
      .leftJoin(
        tables.PURCHASED_COURSES,
        `${tables.COURSES}.id`,
        `${tables.PURCHASED_COURSES}.course_id`
      )
      .leftJoin(
        tables.USERS,
        `${tables.PURCHASED_COURSES}.user_id`,
        `${tables.USERS}.id`
      )
      .innerJoin(
        tables.LESSONS,
        `${tables.COURSES}.id`,
        `${tables.LESSONS}.course_id`
      )
      .where("users.email", userEmail)
      .andWhere("courses.name", course);

    return lessons;
  };
}

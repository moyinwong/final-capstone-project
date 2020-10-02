import Knex from "knex";
import { tables } from "../tables";

// import { logger } from "../logger";

// interface IPopularCourses {
//   name: string;
//   count: string;
// }

export interface ICourseInfo {
  courseTitle: string;
  courseCategory: number;
  coursePrice: number;
  courseObjective: string;
  courseDescription: string;
  coursePrerequisite: string;
  courseSubcategory?: number | undefined;
}

export class CourseService {
  constructor(private knex: Knex) {}

  // test = async () => {
  //   console.log("hello");
  // };

  getMostPurchasedCourses = async () => {
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
      .orderBy("purchased_users_num", "desc")
      .limit(8);

    return courses;
  };

  getBestRatingCommentCourses = async () => {
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
      .whereNot("rated_score", null)
      .orderBy("rated_score", "desc")
      .limit(8);

    console.log(courses);

    return courses;
  };

  getCourseInfoByName = async (courseName: string) => {
    const courseInfo = await this.knex
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
            "subcategory_id",
            "users.name as tutor_name",
            "users.image as tutor_image",
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
            "users.image",
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
        "tutor_image",
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
        "tutor_image",
        "image"
      )
      .where("course_name", courseName)
      .limit(1);

    return courseInfo;
  };

  getCourseComments = async (courseName: string) => {
    const comments = await this.knex
      .select(
        `${tables.USERS}.name as user_name`,
        `${tables.PURCHASED_COURSES}.comment`,
        `${tables.PURCHASED_COURSES}.rated_score`
      )
      .from(`${tables.COURSES}`)
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
      .where(`${tables.COURSES}.name`, courseName);

    return comments;
  };

  getCourseByInstructor = async (tutorEmail: string) => {
    const userIdArray = await this.knex
      .select("id")
      .from(tables.USERS)
      .where("email", tutorEmail);
    const userId = userIdArray[0].id;

    const courses = this.knex
      .select("*")
      .from(tables.COURSES)
      // .join('lessons', {'courses.id': 'lessons.course_id'})
      .where("tutor_id", userId);
    // console.log(courses)
    return courses;
  };

  createCourse = async (
    userEmail: string,
    courseInfo: ICourseInfo,
    courseCover: string
  ) => {
    const userIdArray = await this.knex
      .select("id")
      .from(tables.USERS)
      .where("email", userEmail);
    const userId = userIdArray[0];

    console.log(courseInfo.courseSubcategory);
    let course;
    if (courseInfo.courseSubcategory) {
      course = await this.knex
        .insert({
          name: courseInfo.courseTitle,
          price: courseInfo.coursePrice,
          category_id: courseInfo.courseCategory,
          subcategory_id: courseInfo.courseSubcategory,
          tutor_id: userId.id,
          image: courseCover,
          description: courseInfo.courseDescription,
          objective: courseInfo.courseObjective,
          prerequisites: courseInfo.coursePrerequisite,
        })
        .returning("id")
        .into(tables.COURSES);
    } else {
      course = await this.knex
        .insert({
          name: courseInfo.courseTitle,
          price: courseInfo.coursePrice,
          category_id: courseInfo.courseCategory,
          tutor_id: userId.id,
          image: courseCover,
          description: courseInfo.courseDescription,
          objective: courseInfo.courseObjective,
          prerequisites: courseInfo.coursePrerequisite,
        })
        .returning("id")
        .into(tables.COURSES);
    }

    return course;
  };

  findPurchasedCourseId = async (userEmail: string, courseName: string) => {
    const purchasedCourse = await this.knex
      .select(`${tables.PURCHASED_COURSES}.id`)
      .from(tables.PURCHASED_COURSES)
      .leftJoin(
        tables.COURSES,
        `${tables.PURCHASED_COURSES}.course_id`,
        `${tables.COURSES}.id`
      )
      .leftJoin(
        tables.USERS,
        `${tables.PURCHASED_COURSES}.user_id`,
        `${tables.USERS}.id`
      )
      .where(`${tables.COURSES}.name`, courseName)
      .andWhere(`${tables.USERS}.email`, userEmail)
      .limit(1);

    return purchasedCourse[0];
  };

  addNewComment = async (
    purchasedCoursesId: number,
    updateComment: string,
    updateRating: number
  ) => {
    const result = await this.knex(`${tables.PURCHASED_COURSES}`)
      .where(`${tables.PURCHASED_COURSES}.id`, purchasedCoursesId)
      .update({ rated_score: updateRating, comment: updateComment });

    return result;
  };

  checkCompletion = async (courseId: number, userId: number) => {
    const completedLessonsId = await this.knex(tables.LESSON_COMPLETION)
      .select("lesson_id")
      .where("course_id", courseId)
      .andWhere("user_id", userId);

    return completedLessonsId;
  };

  getAllLessons = async (courseId: number) => {
    const lessons = await this.knex(tables.LESSONS)
      .count("lessons.id", { as: "lesson_num" })
      .where("lessons.course_id", courseId);

    return lessons[0];
  };
}

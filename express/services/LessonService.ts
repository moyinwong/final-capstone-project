import Knex from "knex";
import { tables } from "../tables";

// import { logger } from "../logger";
export interface IChoice {
  [key: string]: string;
}

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

export interface ILessonWithoutCourseId {
  lessonName: string;
  lessonDescription: string;
  lessonIsTrial: string;
  lessonVideoUrl: string;
}

export class LessonService {
  constructor(private knex: Knex) {}

  getLessonSummaryByCourse = async (course: string) => {
    const lessons: Array<ILesson> = await this.knex
      .select(
        "courses.category_id",
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
    const userId = (
      await this.knex(tables.USERS)
        .select("id")
        .where("email", userEmail)
        .first()
    ).id;

    const checkUserIsTutor = await this.knex(tables.COURSES)
      .select("courses.name")
      .where("name", course)
      .andWhere("tutor_id", userId);

    let lessons: Array<ILesson>;

    //console.log(checkUserIsTutor);
    if (checkUserIsTutor.length != 0) {
      console.log("hello");
      lessons = await this.knex
        .select(
          "courses.id as course_id",
          "courses.name as course_name",
          "courses.tutor_id",
          "lessons.id as lesson_id",
          "lessons.name as lesson_name",
          "lessons.description as lesson_description",
          "is_trial",
          "video_url",
          "users.email as user_email"
        )
        .from(tables.COURSES)
        .leftJoin(
          tables.USERS,
          `${tables.COURSES}.tutor_id`,
          `${tables.USERS}.id`
        )
        .innerJoin(
          tables.LESSONS,
          `${tables.COURSES}.id`,
          `${tables.LESSONS}.course_id`
        )
        .where("courses.tutor_id", userId)
        .andWhere("courses.name", course);
    } else {
      lessons = await this.knex
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
    }

    return lessons;
  };

  getLessonAccessibility = async (lessonName: string) => {
    const [lesson] = await this.knex
      .select(
        "courses.category_id",
        "courses.subcategory_id",
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
      .where(`${tables.LESSONS}.name`, lessonName)
      .limit(1);
    return lesson;
  };

  getLessonQuestionAndAnswer = async (lessonName: string) => {
    const questionAndAnswer = await this.knex
      .select(
        `${tables.LESSONS}.id as lesson_id`,
        `${tables.LESSONS}.name as lesson_name`,
        `${tables.QUESTIONS}.id as question_id`,
        `${tables.QUESTIONS}.question`,
        `${tables.MC_ANSWERS}.id as answer_id`,
        `${tables.MC_ANSWERS}.answer_body`
      )
      .from(`${tables.LESSONS}`)
      .rightJoin(
        `${tables.QUESTIONS}`,
        `${tables.LESSONS}.id`,
        `${tables.QUESTIONS}.lesson_id`
      )
      .rightJoin(
        `${tables.MC_ANSWERS}`,
        `${tables.QUESTIONS}.id`,
        `${tables.MC_ANSWERS}.question_id`
      )
      .where(`${tables.LESSONS}.name`, lessonName);
    return questionAndAnswer;
  };

  getCorrectAnswer = async (lessonName: string) => {
    const answers = await this.knex
      .select(
        `${tables.QUESTIONS}.question`,
        `${tables.MC_ANSWERS}.answer_body`,
        `${tables.MC_ANSWERS}.is_correct_answer`
      )
      .from(`${tables.LESSONS}`)
      .rightJoin(
        `${tables.QUESTIONS}`,
        `${tables.LESSONS}.id`,
        `${tables.QUESTIONS}.lesson_id`
      )
      .rightJoin(
        `${tables.MC_ANSWERS}`,
        `${tables.QUESTIONS}.id`,
        `${tables.MC_ANSWERS}.question_id`
      )
      .where(`${tables.LESSONS}.name`, lessonName)
      .andWhere(`${tables.MC_ANSWERS}.is_correct_answer`, true);

    console.log(answers);
    return answers;
  };

  getLessonFiles = async (lessonName: string) => {
    const lesson = await this.knex
      .select(
        `${tables.LESSONS}.id as lesson_id`,
        `${tables.LESSONS}.name as lesson_name`,
        `${tables.FILES}.id as name_id`,
        `${tables.FILES}.name as file_name`
      )
      .from(`${tables.LESSONS}`)
      .rightJoin(
        `${tables.FILES}`,
        `${tables.LESSONS}.id`,
        `${tables.FILES}.lesson_id`
      )
      .where(`${tables.LESSONS}.name`, lessonName);
    return lesson;
  };

  createLesson = async (
    lessonInfo: ILessonWithoutCourseId,
    courseName: string,
    materialArray?: any[]
  ) => {
    const courseIdArray = await this.knex
      .select("id")
      .from(tables.COURSES)
      .where("name", courseName);
    const courseId = courseIdArray[0].id;
    // console.log(lessonInfo)
    let isTrial = lessonInfo.lessonIsTrial === "true";

    const lessonIdArray = await this.knex
      .insert({
        name: lessonInfo.lessonName,
        description: lessonInfo.lessonDescription,
        is_trial: isTrial,
        video_url: lessonInfo.lessonVideoUrl,
        course_id: courseId,
      })
      .into(tables.LESSONS)
      .returning("id");

    const lessonId = lessonIdArray[0];

    let filesUploaded: any[] = [];

    if (materialArray) {
      for (let material of materialArray) {
        let fileUploadedId = await this.knex
          .insert({
            name: material,
            lesson_id: lessonId,
          })
          .into(tables.FILES)
          .returning("id");

        //console.log("line 267", fileUploadedId);
        filesUploaded.push(fileUploadedId);
      }
    }

    return lessonId;
  };

  editLesson = async (
    lessonInfo: ILessonWithoutCourseId,
    lessonName: string,
    materialArray?: any[]
  ) => {
    const lesson = await this.knex
      .select("id")
      .from(tables.LESSONS)
      .where("name", lessonName)
      .first();
    const lessonId = lesson.id;

    let isTrial = lessonInfo.lessonIsTrial === "true";

    const updatedLessonId = await this.knex(tables.LESSONS)
      .where("id", lessonId)
      .update(
        {
          name: lessonInfo.lessonName,
          description: lessonInfo.lessonDescription,
          is_trial: isTrial,
          video_url: lessonInfo.lessonVideoUrl,
        },
        ["id"]
      );

    let filesUploaded: any[] = [];
    if (materialArray) {
      for (let material of materialArray) {
        let fileUploadedId = await this.knex
          .insert({
            name: material,
            lesson_id: lessonId,
          })
          .into(tables.FILES)
          .returning("id");

        //console.log("line 267", fileUploadedId);
        filesUploaded.push(fileUploadedId);
      }
    }

    return updatedLessonId;
  };

  createLessonQuestion = async (
    question: string,
    lessonName: string,
    choices: IChoice[]
  ) => {
    const lessonIdArray = await this.knex
      .select("id")
      .from(tables.LESSONS)
      .where("name", lessonName);
    const lessonId = lessonIdArray[0].id;

    const questionIdArray = await this.knex
      .insert({
        question: question,
        lesson_id: lessonId,
        is_MC: true,
      })
      .into(tables.QUESTIONS)
      .returning("id");
    const questionId = questionIdArray[0];

    let mcAnswerIdArray = [];

    for (let choice of choices) {
      let answerBody = Object.keys(choice)[0];
      let isTrue = choice[answerBody] === "true";

      let mcIdArray = await this.knex
        .insert({
          question_id: questionId,
          answer_body: answerBody,
          is_correct_answer: isTrue,
        })
        .into(tables.MC_ANSWERS)
        .returning("id");
      let mcAnswerId = mcIdArray[0];

      mcAnswerIdArray.push(mcAnswerId);
    }

    return [questionId, mcAnswerIdArray];
  };

  getDiscussionThreadsByLessonId = async (lessonId: number) => {
    const threads = await this.knex
      .select(
        `discussion_id`,
        `${tables.THREADS}.id as threads_id`,
        `${tables.DISCUSSIONS}.topic as topic`,
        `${tables.THREADS}.content as thread_content`,
        `${tables.USERS}.name as username`
      )
      .from(`${tables.DISCUSSIONS}`)
      .rightJoin(
        `${tables.THREADS}`,
        `${tables.DISCUSSIONS}.id`,
        `${tables.THREADS}.discussion_id`
      )
      .leftJoin(
        `${tables.USERS}`,
        `${tables.THREADS}.user_id`,
        `${tables.USERS}.id`
      )
      .where(`${tables.DISCUSSIONS}.lesson_id`, lessonId);

    //need to build controller

    return threads;
  };

  lessonCompleted = async (
    lessonId: number,
    userId: number,
    courseId: number
  ) => {
    const completionId = await this.knex
      .insert({
        user_id: userId,
        lesson_id: lessonId,
        course_id: courseId,
      })
      .into(tables.LESSON_COMPLETION)
      .returning("id");

    //console.log(completionId);
    return completionId[0];
  };

  checkLessonCompleted = async (lessonId: number, userId: number) => {
    const checkIfcompleted = await this.knex
      .select("user_id")
      .from(tables.LESSON_COMPLETION)
      .where("lesson_id", lessonId)
      .andWhere("user_id", userId);

    if (checkIfcompleted.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  addNewTopic = async (
    userEmail: string,
    lessonId: number,
    newTopic: string
  ) => {
    const user = await this.knex
      .select("id")
      .from(tables.USERS)
      .where("email", userEmail)
      .limit(1);

    const userId = user[0].id;

    const AddTopicId = await this.knex(tables.DISCUSSIONS)
      .insert({
        user_id: userId,
        lesson_id: lessonId,
        topic: newTopic,
      })
      .returning("id");

    return AddTopicId;
  };

  addNewThread = async (
    userEmail: string,
    discussionId: number,
    newThread: string
  ) => {
    const user = await this.knex
      .select("id")
      .from(tables.USERS)
      .where("email", userEmail)
      .limit(1);

    const userId = user[0].id;

    const AddThreadNum = await this.knex(tables.THREADS).insert({
      user_id: userId,
      discussion_id: discussionId,
      content: newThread,
    });

    return AddThreadNum;
  };
}

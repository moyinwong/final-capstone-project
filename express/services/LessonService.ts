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

interface ILessonWithoutCourseId {
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

  getLessonAccessibility = async (lessonName: string) => {
    const [lesson] = await this.knex
      .select("*")
      .from(`${tables.LESSONS}`)
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

  createLesson = async (lessonInfo: ILessonWithoutCourseId, courseName: string, materialArray?:any[]) => {
    const courseIdArray = await (this.knex
      .select('id')
      .from(tables.COURSES)
      .where('name', courseName))
    const courseId = courseIdArray[0].id
    // console.log(lessonInfo)
    let isTrial = lessonInfo.lessonIsTrial === 'true'

    const lessonId = await this.knex
    .insert({
      name: lessonInfo.lessonName,
      description: lessonInfo.lessonDescription,
      is_trial: isTrial,
      video_url: lessonInfo.lessonVideoUrl,
      course_id: courseId
    })
    .into(tables.LESSONS)
    .returning('id')

    let filesUploaded:any[] = [];

    if(materialArray) {
      for (let material of materialArray) {
        let fileUploaded = this.knex
          .insert({
            name: material.filename,
            lesson_id: lessonId
          })
          .into(tables.FILES)
          .returning('id')

        filesUploaded.push(fileUploaded)
      }
    }

    return lessonId
  }

  createLessonQuestion = async (question: string, lessonName: string, choices: []) => {
    const lessonIdArray = await (this.knex
      .select('id')
      .from(tables.LESSONS)
      .where('name', lessonName))
    const lessonId = lessonIdArray[0].id
  
    const questionIdArray = await (this.knex
    .insert({
      question: question,
      lesson_id: lessonId,
      is_MC: true
    })
    .into(tables.QUESTIONS)
    .returning('id'))
    const questionId = questionIdArray[0]

    // let mcAnswerIdArray = [];

    for (let choice of choices) {
      let answerBody = Object.keys(choice)[0];
      let isTrue = choice[answerBody] === 'true';

      let mcAnswerIdArray = this.knex
      .insert({
        question_id: questionId,
        answer_body: answerBody,
        is_correct_answer: isTrue
      })
      .into(tables.MC_ANSWERS)
      .returning('id')
      
      console.log(mcAnswerIdArray)
    }
      // console.log(mcAnswerIdArray)
    // }
    // let mcAnswerId = this.knex
    // .insert({
    //   question_id: 12,
    //   answer_body: 'haha',
    //   is_correct_answer: true
    // })
    // .into(tables.MC_ANSWERS)
    // .returning('id')

    // console.log(mcAnswerId)

    // return [ questionId, mcAnswerIdArray ]
    // return questionId
    return questionId
  }

  

}

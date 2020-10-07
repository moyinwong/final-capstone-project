import Knex from "knex";
import { IUser } from "./models";
import { tables } from "../tables";
import { logger } from "../logger";

interface INewUser {
  email: string;
  password?: string;
  name: string;
  title?: string;
  introduction?: string;
}

export class UserService {
  constructor(private knex: Knex) {}

  signup = async (userInfo: INewUser, userImage?: string) => {
    let userId: any;
    if (userImage) {
      userId = (
        await this.knex
          .insert({
            email: userInfo.email,
            password: userInfo.password,
            name: userInfo.name,
            image: userImage,
          })
          .into(tables.USERS)
          .returning("id")
      )[0];
    } else {
      userId = (
        await this.knex
          .insert({
            email: userInfo.email,
            password: userInfo.password,
            name: userInfo.name,
            image: "user-image-placeholder.png",
          })
          .into(tables.USERS)
          .returning("id")
      )[0];
    }
    return userId;
  };

  editProfile = async (
    userInfo: INewUser,
    userId: number,
    userImage?: string
  ) => {
    let editedUserId: any;
    if (userImage && userInfo.password) {
      editedUserId = await this.knex(tables.USERS).where("id", userId).update(
        {
          email: userInfo.email,
          password: userInfo.password,
          name: userInfo.name,
          image: userImage,
          title: userInfo.title,
          introduction: userInfo.introduction,
        },
        ["id"]
      );
    } else if (userInfo.password) {
      editedUserId = await this.knex(tables.USERS).where("id", userId).update(
        {
          email: userInfo.email,
          password: userInfo.password,
          name: userInfo.name,
          title: userInfo.title,
          introduction: userInfo.introduction,
        },
        ["id"]
      );
    } else if (userImage) {
      editedUserId = await this.knex(tables.USERS).where("id", userId).update(
        {
          email: userInfo.email,
          name: userInfo.name,
          image: userImage,
          title: userInfo.title,
          introduction: userInfo.introduction,
        },
        ["id"]
      );
    } else {
      editedUserId = await this.knex(tables.USERS).where("id", userId).update(
        {
          email: userInfo.email,
          name: userInfo.name,
          title: userInfo.title,
          introduction: userInfo.introduction,
        },
        ["id"]
      );
    }

    //console.log(editedUserId)

    return editedUserId;
  };

  registerAsTutor = async (userEmail: string) => {
    // const user = await this.knex(tables.USERS)
    // .insert({
    //   is_tutor: true
    // })
    //console.log("line: 93 userService");
  };

  getUserByEmail = async (email: string) => {
    const user = await this.knex<IUser>(tables.USERS)
      .where("email", email)
      .first();
    return user;
  };

  getUserByID = async (id: number) => {
    const user = await this.knex<IUser>(tables.USERS).where("id", id).first();
    return user;
  };

  createUserWithGoogle = async (
    email: string,
    password: string,
    google_id: string,
    name: string,
    image: string
  ) => {
    try {
      const [id] = await this.knex(tables.USERS)
        .insert({
          email,
          password,
          google_id,
          name,
          image,
        })
        .returning("id");

      return id as number;
    } catch (err) {
      throw err;
    }
  };

  getUserByGoogleId = async (googleId: string) => {
    const user: IUser = await this.knex(tables.USERS)
      .select("*")
      .where(`${tables.USERS}.google_id`, googleId)
      .first();
    //console.log(user);
    return user;
  };

  createUserWithFacebook = async (
    email: string,
    password: string,
    facebook_id: string,
    name: string,
    image: string
  ) => {
    try {
      return await this.knex(tables.USERS)
        .insert({
          email,
          password,
          facebook_id,
          name,
          image,
        })
        .returning(["id", "email"]);
    } catch (err) {
      throw err;
    }
  };

  getUserByFacebookId = async (facebookId: string) => {
    const user: IUser = await this.knex(tables.USERS)
      .select("*")
      .where(`facebook_id`, facebookId)
      .first();
    return user;
  };

  getUserIsAllowAccessCourse = async (
    userEmail: string,
    courseName: string
  ) => {
    const userId = (
      await this.knex(tables.USERS)
        .select("id")
        .where("email", userEmail)
        .first()
    ).id;

    const checkUserIsTutor = await this.knex(tables.COURSES)
      .select("courses.name")
      .where("name", courseName)
      .andWhere("tutor_id", userId);

    if (checkUserIsTutor.length !== 0) {
      return true;
    }

    const userAllowAccessCourses: Array<{
      user_email: string;
      course_name: string | null;
    }> = await this.knex
      .select("users.email as user_email", "courses.name as course_name")
      .from(tables.USERS)
      .leftJoin(
        tables.PURCHASED_COURSES,
        "users.id",
        `${tables.PURCHASED_COURSES}.user_id`
      )
      .leftJoin(tables.COURSES, "course_id", `${tables.COURSES}.id`)
      .where("users.email", userEmail)
      .andWhere("courses.name", courseName);

    logger.debug(userAllowAccessCourses);

    return userAllowAccessCourses.length !== 0 ? true : false;
  };

  getUserAllAllowAccessCourses = async (userEmail: string) => {
    const userAllowAccessCourses: Array<{
      user_email: string;
      course_name: string | null;
    }> = await this.knex
      .select("users.email as user_email", "courses.name as course_name")
      .from(tables.USERS)
      .leftJoin(
        tables.PURCHASED_COURSES,
        "users.id",
        `${tables.PURCHASED_COURSES}.user_id`
      )
      .leftJoin(tables.COURSES, "course_id", `${tables.COURSES}.id`)
      .where("users.email", userEmail);

    logger.debug(userAllowAccessCourses);

    return userAllowAccessCourses;
  };

  getAllCoursesDetail = async (userId: number) => {
    const courses = await this.knex
      .select(
        "purchased_courses.course_id",
        "courses.category_id",
        "courses.subcategory_id",
        "courses.name as course_name",
        "courses.image",
        "courses.description",
        "courses.objective",
        "courses.prerequisites",
        "users.name as tutor_name",
        "users.email as tutor_email",
        "users.title as tutor_title",
        "users.introduction as tutor_introduction"
      )
      .from(tables.PURCHASED_COURSES)
      .join(
        tables.COURSES,
        `${tables.COURSES}.id`,
        "purchased_courses.course_id"
      )
      .join(tables.LESSONS, `${tables.LESSONS}.id`, "courses.id")
      .join(tables.USERS, `${tables.USERS}.id`, `courses.tutor_id`)
      .groupBy(
        "purchased_courses.course_id",
        "courses.category_id",
        "courses.subcategory_id",
        "courses.name",
        "courses.image",
        "courses.description",
        "courses.objective",
        "courses.prerequisites",
        "users.name",
        "users.email",
        "users.title",
        "users.introduction"
      )
      .where(`${tables.PURCHASED_COURSES}.user_id`, userId);

    return courses;
  };
}

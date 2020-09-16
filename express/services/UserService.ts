import Knex from "knex";
import { IUser } from "./models";
import { tables } from "../tables";

export class UserService {
  constructor(private knex: Knex) {}

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
    console.log(user);
    return user;
  };
}

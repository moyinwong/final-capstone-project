import Knex from "knex";
import { IUser } from "./models";
import { tables } from "../tables";

export class UserService {
  constructor(private knex: Knex) {}

  getUserByEmail = async (username: string) => {
    const user = await this.knex<IUser>(tables.USERS)
      .where("username", username)
      .first();
    return user;
  };

  getUserByID = async (id: number) => {
    const user = await this.knex<IUser>(tables.USERS).where("id", id).first();
    return user;
  };
}

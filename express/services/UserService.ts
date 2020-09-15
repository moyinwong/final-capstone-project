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
}

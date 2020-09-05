import Knex from "knex";

export class UserService {
  constructor(private knex: Knex) {}

  getUserByID = async (id: number) => {
    console.log(this.knex);
    // const user = await this.knex<IUser>(tables.USERS)
    //     .where("id", id)
    //     .first();
    // return user;
  };
}

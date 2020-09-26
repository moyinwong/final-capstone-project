import * as Knex from "knex";
import { tables } from "../tables";

const usersTable = tables.USERS;

import { hashPassword } from "../hash";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(usersTable).del();

  const hashedPassword = await hashPassword("1234");

  // Inserts seed entries
  await knex(usersTable).insert([
    {
      email: "apple@abc.com",
      password: hashedPassword,
      name: "Apple",
      image: "test-1.png",
      is_tutor: false,
      title: "student",
      introduction: "hi my name is apple, i am a From 4 student",
    },
    {
      email: "banana@abc.com",
      password: hashedPassword,
      name: "Banana",
      image: "test-1.png",
      is_tutor: false,
      title: "tecky alumni",
      introduction: "hi my name is banana, i am a good person",
    },
    {
      email: "cat@abc.com",
      password: hashedPassword,
      name: "teacher01",
      image: "test-1.png",
      is_tutor: true,
      stripe_id: "acct_1HVIZmEar5uWLoZR",
      title: "DSE 補習教師1",
      introduction: "hi my name is tutor, i am a good teacher",
    },
    {
      email: "dog@abc.com",
      password: hashedPassword,
      name: "teacher02",
      image: "test-1.png",
      is_tutor: true,
      stripe_id: "acct_1HVXrIF1vd04vxx6",
      title: "DSE 補習教師2",
      introduction: "hi my name is tutor, i am a good teacher",
    },
  ]);
}

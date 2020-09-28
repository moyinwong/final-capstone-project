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
    {
      email: "alex@tecky.com",
      password: hashedPassword,
      name: "Alex Lau",
      image: "alex.jpeg",
      is_tutor: true,
      stripe_id: "acct_1HVXrIF1vd04vxx6",
      title: "首席導師",
      introduction: "Alex 曾榮獲多項本地及亞太科技大獎，作為多家科技公司的顧問和 Play More Limited 前首席技術官，他具備軟件開發和管理的專業知識。",
    },
    {
      email: "goldon@tecky.com",
      password: hashedPassword,
      name: "Gordon Lau",
      image: "gordon.jpg",
      is_tutor: true,
      stripe_id: "acct_1HVXrIF1vd04vxx6",
      title: "課程總監",
      introduction: "前 Accelerate HK 首席技術官。曾於多間不同行業規模的公司參與軟件開發的工作。超過10年編程經驗，同時有超過2年編程教育經驗。",
    },
    {
      email: "jason@tecky.com",
      password: hashedPassword,
      name: "Jason Lee",
      image: "jason.jpg",
      is_tutor: true,
      stripe_id: "acct_1HVXrIF1vd04vxx6",
      title: "課程講師",
      introduction: "Alex 曾榮獲多項本地及亞太科技大獎，作為多家科技公司的顧問和 Play More Limited 前首席技術官，他具備軟件開發和管理的專業知識。",
    },
    {
      email: "andrew@tecky.com",
      password: hashedPassword,
      name: "Andrew Shek",
      image: "andrew.jpg",
      is_tutor: true,
      stripe_id: "acct_1HVXrIF1vd04vxx6",
      title: "課程講師",
      introduction: "曾任職不同範疇公司R&D軟件工程師，例如，長者智能居家安全系統、生物科技、金融科技、電子消費品及客制化Microsoft產品解決方案。",
    },
    {
      email: "dragon@tecky.com",
      password: hashedPassword,
      name: "Dragon Lung",
      image: "dragon.jpg",
      is_tutor: true,
      stripe_id: "acct_1HVXrIF1vd04vxx6",
      title: "課程講師",
      introduction: "Dragon是一位充滿熱誠的初創企業家，熱衷於探索最新的技術並應用在真實世界當中。Dragon加入科啟學院之前，一直在自己創立的初創企業中創業。",
    },
    {
      email: "beeno@tecky.com",
      password: hashedPassword,
      name: "Beeno Tung",
      image: "beeno.jpg",
      is_tutor: true,
      stripe_id: "acct_1HVXrIF1vd04vxx6",
      title: "課程講師",
      introduction: "Beeno 曾任香港理工大學助教。現為理大和一間本地金融科技初創公司的區塊鏈與大數據技術研發人員。",
    }
  ]);
}

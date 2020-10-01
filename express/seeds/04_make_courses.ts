import * as Knex from "knex";
import { tables } from "../tables";
import faker from "faker";
import { ICourse } from "../services/models";

const coursesTable = tables.COURSES;

const randomCourseList: any[] = [];

export async function seed(knex: Knex): Promise<void> {
  //generate random course
  for (let i = 0; i < 301; i++) {
    const randomCategoryId: number = Math.floor(Math.random() * 15) + 1;
    const randomObj: any = {
      name: faker.system.fileName(),
      price: Math.floor(Math.random() * 500) + 40,
      category_id: randomCategoryId,
      tutor_id: Math.floor(Math.random() * 2) + 3,
      // either 3 or 4 (tutor id)
      image: `https://picsum.photos/777/434?random=${i}`,
      description: faker.commerce.productDescription(),
      objective: "提升學生技巧",
      prerequisites: "無",
    };
    if (randomObj.category_id === 15)
      randomObj.subcategory_id = Math.floor(Math.random() * 4) + 1;
    randomCourseList.push(randomObj);
  }

  // Deletes ALL existing entries
  await knex(coursesTable).del();

  // Inserts seed entries
  await knex(coursesTable).insert<ICourse[]>(
    [
      {
        name: "DSE 中文 5* 攻略",
        price: 99,
        category_id: "1",
        tutor_id: 3,
        image: "https://i.ytimg.com/vi/6A_HQhYwlrI/maxresdefault.jpg",
        description: "DSE中文卷一由2升到5*",
        objective: "幫助提升中文",
        prerequisites: "DSE 準考生",
      },
      {
        name: "HKDSE 英文 Paper 2 寫作",
        price: 199,
        category_id: "2",
        tutor_id: 4,
        image: "https://i.ytimg.com/vi/YUNzWH27CTo/maxresdefault.jpg",
        description:
          "想 DSE 英文 Paper 2 作文進步、拎高分？我幫大家做左少少準備、又分享左唔少 TIPS! 希望大家鍾意呢個 Playlist!  我地一齊係作文卷上 1-2 個 Grade!",
        objective: "幫助提升英文",
        prerequisites: "DSE 準考生",
      },
      {
        name: "DSE範文罐頭",
        price: 49,
        category_id: "1",
        tutor_id: 4,
        image:
          "https://i.ytimg.com/vi/k_azP6gm884/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLDjSD2MvEKj-_I-YpBpu6BjD4-NZw",
        description: "一堆DSE範文罐頭",
        objective: "幫助提升中文",
        prerequisites: "DSE 準考生",
      },
      {
        name: "DSE中文說話天書",
        price: 100,
        category_id: "1",
        tutor_id: 4,
        image:
          "https://i.ytimg.com/vi/iS4ghKXFkaU/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLBXHkGCb48AHod-g0D_3KXnv5x9xQ",
        description: "DSE中文說話",
        objective: "提升學生說話技巧",
        prerequisites: "DSE 準考生",
      },
      {
        name: "一個字 Programming",
        price: 99,
        category_id: "15",
        subcategory_id: "1",
        tutor_id: 3,
        image: "https://i.ytimg.com/vi/uA8jsazvSSM/maxresdefault.jpg",
        description: "一個字 Programming",
        objective: "提升學生Programming技巧",
        prerequisites: "無",
      },
    ].concat(randomCourseList)
  );
}

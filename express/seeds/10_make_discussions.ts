import * as Knex from "knex";
import { tables } from "../tables";
import faker from 'faker'

const discussionsTable = tables.DISCUSSIONS;

function randomIntFromInterval(min:number, max:number) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const randomDiscussionList: any[] = [];

export async function seed(knex: Knex): Promise<void> {

    // //generate random discussion
    for (let i = 0; i < 100; i++) {
      const randomUserId: number = randomIntFromInterval(1, 11);
      const randomLessonId: number = randomIntFromInterval(1, 20)
      const randomObj: any = {
        user_id: randomUserId,
        lesson_id: randomLessonId,
        topic: faker.lorem.sentence()
      };
  
      randomDiscussionList.push(randomObj);
    }

  // Deletes ALL existing entries
  await knex(discussionsTable).del();

  // Inserts seed entries
  await knex(discussionsTable).insert([
    {
      user_id: 1,
      lesson_id: 1,
      topic: "大家覺得邊個牌子收音機最好用？",
    },
    {
      user_id: 2,
      lesson_id: 1,
      topic: "成日聽人講野就想訓教點算",
    },
    {
      user_id: 3,
      lesson_id: 1,
      topic: "有無邊到可以安靜溫書？",
    },
    {
      user_id: 3,
      lesson_id: 1,
      topic: "DSE2019 中文listening pastpaper有問題",
    },
    {
      user_id: 2,
      lesson_id: 4,
      topic: "點樣可以識多啲vocab?",
    },
    {
      user_id: 4,
      lesson_id: 4,
      topic: "reading揀B1定B2好？",
    },
    {
      user_id: 1,
      lesson_id: 4,
      topic: "第3點致命傷可唔可以再講多啲",
    },
    {
      user_id: 4,
      lesson_id: 4,
      topic: "Is the any exercise I can work on",
    },
    {
      user_id: 1,
      lesson_id: 2,
      topic: "文言文點樣進步",
    },
    {
      user_id: 1,
      lesson_id: 2,
      topic: "閱讀卷好難阿！！",
    },
  ].concat(randomDiscussionList));
}

import * as Knex from "knex";
import { tables } from "../tables";

const lessonsTable = tables.LESSONS;

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(lessonsTable).del();

  // Inserts seed entries
  await knex(lessonsTable).insert([
    {
      name: "我當時用收音機考試聽唔到？｜用紅外線考好過收音機？",
      description: `Hello大家好我係ad
      今次係想同大家分享下我當時用收音機考聆聽嘅經歷
      一開頭真係好擔心！
      但其實用收音機考都幾好🤣🙈
      唔使咁擔心架～
      希望大家DSE可以旗開得勝啦～
      加油！`,
      is_trial: true,
      video_url: "https://youtu.be/k8KZ3cSbKC8",
      course_id: 1,
    },
    {
      name:
        "2020 DSE中文卷一閱讀理解｜由2升到5*｜十二篇範文點溫好？｜有咩小技巧？",
      description: `2020DSE中文卷一｜十二篇範文點溫好？
      想知點解我可以由學校pre我lv.2到最後攞5*就記得睇埋落去啦～🤓
      希望呢條片出得及時 唔算太遲🦾
      有咩唔明可以ig inbox搵我
      希望過左30/3你地會話比我聽你地考成點啦～期待你地嘅好消息🤍`,
      is_trial: false,
      video_url: "https://youtu.be/6A_HQhYwlrI",
      course_id: 1,
    },
    {
      name: "2020 DSE中文卷二寫作｜點樣呃到啲分返黎｜人物事例又使唔使背？",
      description: `年近二十少女的艾豬：@castle.ad
      咁其實呢張卷私都唔係考得高grade，所以我都參考左我一個攞5**朋友嘅意見。希望可以幫到大家~
      有咩唔明可以ig inbox/留言問我
      希望到左30/3你地會話比我聽你地考成點啦～期待你地嘅好消息`,
      is_trial: false,
      video_url: "https://youtu.be/8xSFY3LK77k",
      course_id: 1,
    },
  ]);
}

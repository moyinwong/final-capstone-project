import * as Knex from "knex";
import { tables } from "../tables";

const coursesTable = tables.COURSES;

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(coursesTable).del();

  // Inserts seed entries
  await knex(coursesTable).insert([
    {
      name: "DSE 中文 5* 攻略",
      price: 99,
      category_id: "1",
      tutor_id: 3,
      image:
        "https://i.ytimg.com/an_webp/6A_HQhYwlrI/mqdefault_6s.webp?du=3000&sqp=CP6qkPsF&rs=AOn4CLD5ZX24vY2WEU91QpbDfWotG0FOzg",
      description: "DSE中文卷一由2升到5*",
      objective: "幫助提升中文",
      prerequisites: "DSE 準考生",
    },
    {
      name: "HKDSE 英文 Paper 2 寫作",
      price: 199,
      category_id: "2",
      tutor_id: 4,
      image:
        "https://i.ytimg.com/an_webp/YUNzWH27CTo/mqdefault_6s.webp?du=3000&sqp=CJKfh_sF&rs=AOn4CLCCiXLCImpJaPDEVhZ4yn72wOHRNg",
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
  ]);
}

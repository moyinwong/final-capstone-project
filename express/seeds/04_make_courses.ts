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
      description: "DSE中文卷一由2升到5*",
      objective: "幫助提升中文",
      prerequisites: "DSE 準考生",
    },
    {
      name: "HKDSE 英文 Paper 2 寫作",
      price: 199,
      category_id: "2",
      tutor_id: 4,
      description:
        "想 DSE 英文 Paper 2 作文進步、拎高分？我幫大家做左少少準備、又分享左唔少 TIPS! 希望大家鍾意呢個 Playlist!  我地一齊係作文卷上 1-2 個 Grade!",
      objective: "幫助提升英文",
      prerequisites: "DSE 準考生",
    },
  ]);
}

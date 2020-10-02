import * as Knex from "knex";
import { tables } from "../tables";
import faker from 'faker'

const threadsTables = tables.THREADS;

function randomIntFromInterval(min:number, max:number) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const randomThreadList: any[] = [];

export async function seed(knex: Knex): Promise<void> {

  // //generate random thread
  for (let i = 0; i < 500; i++) {
    const randomUserId: number = randomIntFromInterval(1, 11);
    const randomLessonId: number = randomIntFromInterval(1, 100)
    const randomObj: any = {
      user_id: randomUserId,
      discussion_id: randomLessonId,
      content: faker.commerce.productDescription()
    };

    randomThreadList.push(randomObj);
  }

  // Deletes ALL existing entries
  await knex(threadsTables).del();

  // Inserts seed entries
  await knex(threadsTables).insert([
    {
      user_id: 1,
      discussion_id: 1,
      content:
        "岩阿我都覺得係\n",
    },
    {
      user_id: 1,
      discussion_id: 1,
      content:
        "我都唔識喎\n",
    },
    {
      user_id: 1,
      discussion_id: 1,
      content:
        "不如問返老師\n",
    },
    {
      user_id: 1,
      discussion_id: 1,
      content:
        "留TG再講\n",
    },
    {
      user_id: 1,
      discussion_id: 1,
      content:
        "唔知喎\n",
    },
    {
      user_id: 1,
      discussion_id: 1,
      content:
        "你試下睇返條片\n",
    },
    {
      user_id: 1,
      discussion_id: 1,
      content:
        "uidfhdjfhaldshflashdfahdslfhldsfh\ndsjfhahfdlkahdflhsddjfhajskdhfladsfhjsdf\n",
    },
    {
      user_id: 1,
      discussion_id: 1,
      content:
        "uidfhdjfhaldshflashdfahdslfhldsfh\ndsjfhahfdlkahdflhsddjfhajskdhfladsfhjsdf\n",
    },
    {
      user_id: 1,
      discussion_id: 1,
      content:
        "uidfhdjfhaldshflashdfahdslfhldsfh\ndsjfhahfdlkahdflhsddjfhajskdhfladsfhjsdf\n",
    },
    {
      user_id: 1,
      discussion_id: 1,
      content:
        "uidfhdjfhaldshflashdfahdslfhldsfh\ndsjfhahfdlkahdflhsddjfhajskdhfladsfhjsdf\n",
    },
    {
      user_id: 1,
      discussion_id: 1,
      content:
        "uidfhdjfhaldshflashdfahdslfhldsfh\ndsjfhahfdlkahdflhsddjfhajskdhfladsfhjsdf\n",
    },
    {
      user_id: 1,
      discussion_id: 1,
      content:
        "uidfhdjfhaldshflashdfahdslfhldsfh\ndsjfhahfdlkahdflhsddjfhajskdhfladsfhjsdf\n",
    },
    {
      user_id: 1,
      discussion_id: 1,
      content:
        "uidfhdjfhaldshflashdfahdslfhldsfh\ndsjfhahfdlkahdflhsddjfhajskdhfladsfhjsdf\n",
    },
    {
      user_id: 1,
      discussion_id: 2,
      content:
        "uidfhdjfhaldshflashdfahdslfhldsfh\ndsjfhahfdlkahdflhsddjfhajskdhfladsfhjsdf\n",
    },
    {
      user_id: 1,
      discussion_id: 2,
      content:
        "uidfhdjfhaldshflashdfahdslfhldsfh\ndsjfhahfdlkahdflhsddjfhajskdhfladsfhjsdf\n",
    },
    {
      user_id: 1,
      discussion_id: 2,
      content:
        "uidfhdjfhaldshflashdfahdslfhldsfh\ndsjfhahfdlkahdflhsddjfhajskdhfladsfhjsdf\n",
    },
    {
      user_id: 1,
      discussion_id: 1,
      content:
        "uidfhdjfhaldshflashdfahdslfhldsfh\ndsjfhahfdlkahdflhsddjfhajskdhfladsfhjsdf\n",
    },
    {
      user_id: 1,
      discussion_id: 1,
      content:
        "uidfhdjfhaldshflashdfahdslfhldsfh\ndsjfhahfdlkahdflhsddjfhajskdhfladsfhjsdf\n",
    },
    {
      user_id: 1,
      discussion_id: 2,
      content:
        "uidfhdjfhaldshflashdfahdslfhldsfh\ndsjfhahfdlkahdflhsddjfhajskdhfladsfhjsdf\n",
    },
    {
      user_id: 1,
      discussion_id: 2,
      content:
        "uidfhdjfhaldshflashdfahdslfhldsfh\ndsjfhahfdlkahdflhsddjfhajskdhfladsfhjsdf\n",
    },
    {
      user_id: 1,
      discussion_id: 2,
      content:
        "uidfhdjfhaldshflashdfahdslfhldsfh\ndsjfhahfdlkahdflhsddjfhajskdhfladsfhjsdf\n",
    },
    {
      user_id: 1,
      discussion_id: 2,
      content:
        "uidfhdjfhaldshflashdfahdslfhldsfh\ndsjfhahfdlkahdflhsddjfhajskdhfladsfhjsdf\n",
    },
    {
      user_id: 1,
      discussion_id: 3,
      content:
        "uidfhdjfhaldshflashdfahdslfhldsfh\ndsjfhahfdlkahdflhsddjfhajskdhfladsfhjsdf\n",
    },
    {
      user_id: 1,
      discussion_id: 4,
      content:
        "uidfhdjfhaldshflashdfahdslfhldsfh\ndsjfhahfdlkahdflhsddjfhajskdhfladsfhjsdf\n",
    },
    {
      user_id: 1,
      discussion_id: 5,
      content:
        "uidfhdjfhaldshflashdfahdslfhldsfh\ndsjfhahfdlkahdflhsddjfhajskdhfladsfhjsdf\n",
    },
    {
      user_id: 1,
      discussion_id: 6,
      content:
        "uidfhdjfhaldshflashdfahdslfhldsfh\ndsjfhahfdlkahdflhsddjfhajskdhfladsfhjsdf\n",
    },
    {
      user_id: 1,
      discussion_id: 7,
      content:
        "uidfhdjfhaldshflashdfahdslfhldsfh\ndsjfhahfdlkahdflhsddjfhajskdhfladsfhjsdf\n",
    },
    {
      user_id: 1,
      discussion_id: 8,
      content:
        "uidfhdjfhaldshflashdfahdslfhldsfh\ndsjfhahfdlkahdflhsddjfhajskdhfladsfhjsdf\n",
    },
    {
      user_id: 1,
      discussion_id: 9,
      content:
        "uidfhdjfhaldshflashdfahdslfhldsfh\ndsjfhahfdlkahdflhsddjfhajskdhfladsfhjsdf\n",
    },
    {
      user_id: 1,
      discussion_id: 10,
      content:
        "uidfhdjfhaldshflashdfahdslfhldsfh\ndsjfhahfdlkahdflhsddjfhajskdhfladsfhjsdf\n",
    },
  ].concat(randomThreadList));
}

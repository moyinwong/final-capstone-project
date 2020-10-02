import * as Knex from "knex";
import { tables } from "../tables";

const threadsTables = tables.THREADS;

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(threadsTables).del();

  // Inserts seed entries
  await knex(threadsTables).insert([
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
  ]);
}

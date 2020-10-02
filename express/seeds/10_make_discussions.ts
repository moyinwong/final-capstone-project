import * as Knex from "knex";
import { tables } from "../tables";

const discussionsTable = tables.DISCUSSIONS;

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(discussionsTable).del();

  // Inserts seed entries
  await knex(discussionsTable).insert([
    {
      user_id: 1,
      lesson_id: 1,
      topic: "hdfjkahdjfhskjdhfjkhsdkfkashdjfhfhjkasdhflhalsdf",
    },
    {
      user_id: 1,
      lesson_id: 1,
      topic: "hdfjkahdjfhskjdhfjkhsdkfkashdjfhfhjkasdhflhalsdf",
    },
    {
      user_id: 1,
      lesson_id: 1,
      topic: "hdfjkahdjfhskjdhfjkhsdkfkashdjfhfhjkasdhflhalsdf",
    },
    {
      user_id: 1,
      lesson_id: 1,
      topic: "hdfjkahdjfhskjdhfjkhsdkfkashdjfhfhjkasdhflhalsdf",
    },
    {
      user_id: 1,
      lesson_id: 1,
      topic: "hdfjkahdjfhskjdhfjkhsdkfkashdjfhfhjkasdhflhalsdf",
    },
    {
      user_id: 1,
      lesson_id: 1,
      topic: "hdfjkahdjfhskjdhfjkhsdkfkashdjfhfhjkasdhflhalsdf",
    },
    {
      user_id: 1,
      lesson_id: 1,
      topic: "hdfjkahdjfhskjdhfjkhsdkfkashdjfhfhjkasdhflhalsdf",
    },
    {
      user_id: 1,
      lesson_id: 1,
      topic: "hdfjkahdjfhskjdhfjkhsdkfkashdjfhfhjkasdhflhalsdf",
    },
    {
      user_id: 1,
      lesson_id: 1,
      topic: "hdfjkahdjfhskjdhfjkhsdkfkashdjfhfhjkasdhflhalsdf",
    },
    {
      user_id: 1,
      lesson_id: 1,
      topic: "hdfjkahdjfhskjdhfjkhsdkfkashdjfhfhjkasdhflhalsdf",
    },
  ]);
}

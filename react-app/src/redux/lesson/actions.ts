import { ILessonState } from "./state";

export const GET_VIDEO = "@@LESSON/GET_VIDEO";

interface IGetVideo {
  type: typeof GET_VIDEO;
  lessonId: number;
}

// Action Creator
export const setStudentsSuccess = (lessonId: number): IGetVideo => {
  return {
    type: GET_VIDEO,
    lessonId,
  };
};

export type ILessonActions = IGetVideo;

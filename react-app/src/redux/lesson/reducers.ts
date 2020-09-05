import { ILessonState, initLessonState } from "./state";
// import { } from "./actions";
// import { IBoardActions } from "./actions";

// Reducer is Function
export const lessonReducers = (
  state: ILessonState = initLessonState,
  action: any
): ILessonState => {
  switch (action.type) {
    default:
      return state;
  }
};

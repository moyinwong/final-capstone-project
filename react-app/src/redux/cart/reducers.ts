import { ICourse } from "../../pages/CategoryPage";
import { initialState, ICartState } from "./state";
import { ICartAction } from "./actions";
import produce from "immer";

export const cartReducer = produce((state: ICartState, action: ICartAction) => {
  switch (action.type) {
    case "@@CART/ADD_COURSE":
      let foundInd = state.courses.findIndex((e: ICourse) => {
        return e.course_name === action.course.course_name;
      });
      if (foundInd === -1) state.courses.push(action.course);
      return;
    case "@@CART/REMOVE_COURSE":
      let ind = state.courses.findIndex((e: ICourse) => {
        return e.course_name === action.course_name;
      });
      if (ind !== -1) state.courses.splice(ind, 1);
      return;

    case "@@CART/CLEAR":
      const emptyCourse: ICourse[] = [];
      state.courses = emptyCourse;
      return;
  }
}, initialState);

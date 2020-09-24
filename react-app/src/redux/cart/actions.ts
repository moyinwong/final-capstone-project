import { ICourse } from "../../pages/CategoryPage";

interface IAddCourse {
  type: "@@CART/ADD_COURSE";
  course: ICourse;
}

interface IRemoveCourse {
  type: "@@CART/REMOVE_COURSE";
  course_name: string;
}

interface IClear {
  type: "@@CART/CLEAR";
}

export function addCourse(course: ICourse): IAddCourse {
  return {
    type: "@@CART/ADD_COURSE" as "@@CART/ADD_COURSE",
    course,
  };
}

export function removeCourse(course_name: string): IRemoveCourse {
  return {
    type: "@@CART/REMOVE_COURSE" as "@@CART/REMOVE_COURSE",
    course_name,
  };
}

export function clear(): IClear {
  return {
    type: "@@CART/CLEAR" as "@@CART/CLEAR",
  };
}

type CartAction = typeof addCourse | typeof removeCourse | typeof clear;

export type ICartAction = ReturnType<CartAction>;

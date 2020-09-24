import { ICourse } from "../../pages/CategoryPage";

export interface ICartState {
  courses: ICourse[];
}

export const initialState: ICartState = {
  courses: [],
};

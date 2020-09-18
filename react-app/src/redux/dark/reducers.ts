import { IDarkModeActions } from "./actions";
import { IDarkModeState, initDarkModeState } from "./state";

// Reducer is Function
export const darkModeReducers = (
  state: IDarkModeState = initDarkModeState,
  action: IDarkModeActions
): IDarkModeState => {
  switch (action.type) {
    case "@@DARK_MODE/SWITCH":
      return {
        ...state,
        mode: action.mode,
      };

    default:
      return state;
  }
};

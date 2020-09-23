import { IAuthState, initialState } from "./state";
import { IAuthAction } from "./actions";

export const authReducer = (
  state: IAuthState = initialState,
  action: IAuthAction
) => {
  switch (action.type) {
    case "@@AUTH/LOGIN_SUCCESS":
      return {
        ...state,
        token: action.token,
        isAuthenticated: true,
        message: "",
      };

    case "@@AUTH/GET_USER":
      return {
        ...state,
        email: action.userEmail,
      };

    case '@@AUTH/CHECK_TUTOR':
      return {
        ...state,
        isTutor: action.isTutor,
      }

    case "@@AUTH/LOGOUT":
      return {
        ...state,
        token: null,
        email: null,
        user: null,
        isAuthenticated: false,
        message: "",
      };

    case "@@AUTH/LOGIN_FAIL":
      return {
        ...state,
        isAuthenticated: false,
        message: action.message,
      };
    case "@@AUTH/LOGIN_PROCESSING":
      return {
        ...state,
        isAuthenticated: false,
        message: "",
        isProcessing: true,
      };
    default:
      return state;
  }
};

import { combineReducers, compose, createStore, applyMiddleware } from "redux";
import {
  RouterState,
  connectRouter,
  routerMiddleware,
  CallHistoryMethodAction,
} from "connected-react-router";
import { createBrowserHistory } from "history";

import thunk, { ThunkDispatch as OldThunkDispatch } from "redux-thunk";

import { ILessonState } from "./lesson/state";
import { ILessonActions } from "./lesson/actions";
import { lessonReducers } from "./lesson/reducers";
import { IAuthState } from "./auth/state";
import { IAuthAction } from "./auth/actions";
import { authReducer } from "./auth/reducers";
import { IDarkModeState } from "./dark/state";
import { IDarkModeActions } from "./dark/actions";
import { darkModeReducers } from "./dark/reducers";

export const history = createBrowserHistory();

// step 1: IRootState
export interface IRootState {
  lesson: ILessonState;
  auth: IAuthState;
  dark: IDarkModeState;
  router: RouterState;
}

// step 2: IRootAction
export type IRootAction =
  | ILessonActions
  | IAuthAction
  | IDarkModeActions
  | CallHistoryMethodAction;

// step 3: rootReducer
const rootReducer = combineReducers<IRootState>({
  lesson: lessonReducers,
  auth: authReducer,
  dark: darkModeReducers,
  router: connectRouter(history),
});

// step 4: middleware
declare global {
  /* tslint:disable:interface-name */
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type ThunkDispatch = OldThunkDispatch<IRootState, null, IRootAction>;

// step 5: createStore
export default createStore<IRootState, IRootAction, {}, {}>(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(history))
  )
);

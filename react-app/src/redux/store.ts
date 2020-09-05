import { combineReducers, compose, createStore, applyMiddleware } from "redux";
import {
  RouterState,
  connectRouter,
  routerMiddleware,
  CallHistoryMethodAction,
} from "connected-react-router";
import { createBrowserHistory } from "history";

// FRD007
import thunk, { ThunkDispatch as OldThunkDispatch } from "redux-thunk";

// import { IStudentState } from "./student/state";
// import { studentReducers } from "./student/reducers";
// import { IStudentActions } from "./student/actions";

export const history = createBrowserHistory();

// step 1: IRootState
export interface IRootState {
  // student: IStudentState;
  router: RouterState;
}

// step 2: IRootAction
export type IRootAction = /*IStudentActions*/ CallHistoryMethodAction;

// step 3: rootReducer
const rootReducer = combineReducers<IRootState>({
  // student: studentReducers,
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

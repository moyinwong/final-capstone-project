import {
  combineReducers,
  compose,
  createStore,
  applyMiddleware,
  AnyAction,
  $CombinedState,
  Reducer,
} from "redux";
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
import { ICartState } from "./cart/state";
import { ICartAction } from "./cart/actions";
import { cartReducer } from "./cart/reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistPartial } from "redux-persist/es/persistReducer";

export const history = createBrowserHistory();

// step 1: IRootState
export interface IRootState {
  lesson: ILessonState;
  auth: IAuthState;
  dark: IDarkModeState;
  cart: ICartState;
  router: RouterState;
}

// step 2: IRootAction
export type IRootAction =
  | ILessonActions
  | IAuthAction
  | IDarkModeActions
  | ICartAction
  | CallHistoryMethodAction;

// step 3: rootReducer
export const rootReducer = combineReducers<IRootState>({
  lesson: lessonReducers,
  auth: authReducer,
  dark: darkModeReducers,
  cart: cartReducer,
  router: connectRouter(history),
});

//persist
const persistConfig = {
  key: "root",
  storage: storage,
  // whitelist: ["cart"], which reducer want to store
  blacklist: ["auth"],
};

const pReducer: Reducer<
  {
    readonly [$CombinedState]?: undefined;
  } & IRootState &
    PersistPartial,
  AnyAction
> = persistReducer(persistConfig, rootReducer);

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
export const store = createStore<IRootState, IRootAction, {}, {}>(
  pReducer as any,
  composeEnhancers(
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(history))
  )
);

export const persistor = persistStore(store);

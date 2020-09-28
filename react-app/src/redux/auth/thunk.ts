import { ThunkDispatch, IRootState } from "../store";
import {
  loginSuccess,
  loginFail,
  getUser,
  loginProcessing,
  checkTutor,
} from "./actions";
import { push } from "connected-react-router";
import { Dispatch } from "redux";

export function login(
  email: string,
  password: string,
  previousLocation: string | undefined
) {
  return async (dispatch: ThunkDispatch, getState: () => IRootState) => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    //json object which contain token & user email
    const json = await res.json();
    console.log(json)

    if (json.token != null) {
      localStorage.setItem("token", json.token);
      dispatch(loginSuccess(json.token));
      dispatch(getUser(json.email));
      dispatch(checkTutor(json.isTutor));
      console.log(getState().router.location);
      if (previousLocation) {
        dispatch(push(previousLocation));
      } else {
        dispatch(push("/"));
      }
    } else if (res.status === 401) {
      console.log(res.status)
      dispatch(loginFail("Wrong email/password"));
    }
  };
}

export function restoreLogin() {
  return async (dispatch: ThunkDispatch, getState: () => IRootState) => {
    const token = localStorage.getItem("token");

    if (token) {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/info`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      //json object which contain an user object with an email property
      const json = await res.json();

      if (res.status === 200) {
        dispatch(loginSuccess(token));
        dispatch(getUser(json.user.email));
        dispatch(checkTutor(json.user.isTutor));
        // dispatch(push(getState().router.location.pathname));
      } else {
        dispatch(loginFail(""));
      }
    } else {
      dispatch(loginFail(""));
    }
  };
}

export const loginGoogleThunk = (
  accessToken: string,
  previousLocation: string | undefined
) => {
  return async (dispatch: Dispatch) => {
    // try {} catch() {}
    dispatch(loginProcessing());
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/user/login/google`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken }),
      }
    );

    //json object which contain token and user email
    const data = await res.json();

    if (res.status === 200) {
      localStorage.setItem("token", data.token);
      dispatch(loginSuccess(data.token));
      dispatch(getUser(data.email));
      dispatch(checkTutor(data.isTutor));
      if (previousLocation) {
        console.log("1");
        dispatch(push(previousLocation));
      } else {
        dispatch(push("/"));
      }
    } else {
      dispatch(loginFail(data.message));
    }
  };
};

export function loginFacebook(
  accessToken: string,
  previousLocation: string | undefined
) {
  return async (dispatch: ThunkDispatch) => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/user/login/facebook`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken }),
      }
    );

    //json object which contain token & user email
    const json = await res.json();

    if (res.status === 200) {
      localStorage.setItem("token", json.token);
      dispatch(loginSuccess(json.token));
      dispatch(getUser(json.email));
      dispatch(checkTutor(json.isTutor));
      if (previousLocation) {
        dispatch(push(previousLocation));
      } else {
        dispatch(push("/"));
      }
    } else {
      dispatch(loginFail(json.message));
    }
  };
}

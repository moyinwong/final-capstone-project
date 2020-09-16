import { ThunkDispatch, IRootState } from "../store";
import { loginSuccess, loginFail, getUser, loginProcessing } from "./actions";
import { push } from "connected-react-router";
import { Dispatch } from "redux";

export function login(email: string, password: string) {
  return async (dispatch: ThunkDispatch) => {
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

    const json = await res.json();

    if (json.token != null) {
      localStorage.setItem("token", json.token);
      dispatch(loginSuccess(json.token));
      dispatch(push("/"));
    } else if (res.status === 401) {
      dispatch(loginFail("Wrong email/password"));
    }
  };
}

export function restoreLogin() {
  return async (dispatch: ThunkDispatch, getState:() => IRootState) => {
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
      const json = await res.json();

      if (res.status === 200) {
        dispatch(loginSuccess(token));
        dispatch(getUser(json.user.email));
        // dispatch(push("/"));
        dispatch(push(getState().router.location.pathname));
      } else {
        dispatch(loginFail(""));
      }
    } else {
      dispatch(loginFail(""));
    }
  };
}

export const loginGoogleThunk = (accessToken: string) => {
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
    const data = await res.json();

    if (res.status === 200) {
      localStorage.setItem("token", data.token);
      dispatch(loginSuccess(data.token));
      dispatch(push("/"));
    } else {
      dispatch(loginFail(data.message));
    }
  };
};

export function loginFacebook(accessToken: string) {
  return async (dispatch:ThunkDispatch) => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/login/facebook`, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ accessToken })
    });
    const result = await res.json();
    
    if (res.status === 200) {
      localStorage.setItem('token', result.token);
      dispatch(loginSuccess(result.token))
      dispatch(push('/'))
    } else {
      dispatch(loginFail(result.message))
    }
  }
}

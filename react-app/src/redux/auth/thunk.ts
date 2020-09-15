import { ThunkDispatch } from "../store";
import { loginSuccess, loginFail, getUser } from "./actions";
import { push } from "connected-react-router";

export function login(email: string, password: string) {
    return async (dispatch:ThunkDispatch) => {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, password
            })
        });

        const json = await res.json();

        if (json.token != null) {
            localStorage.setItem('token', json.token);
            dispatch(loginSuccess(json.token))
            dispatch(push('/'))
        } else if(res.status === 401) {
            dispatch(loginFail('Wrong email/password'))
        }
    }
}

export function restoreLogin() {
    return async (dispatch: ThunkDispatch) => {
        const token = localStorage.getItem('token')

        if (token) {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/info`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const json = await res.json()

            if (res.status === 200) {
                dispatch(loginSuccess(token))
                dispatch(getUser(json.user.email))
                dispatch(push('/'))
            } else {
                dispatch(loginFail(''))
            }
        } else {
            dispatch(loginFail(''))
        }
    }
}
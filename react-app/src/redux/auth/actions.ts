

export function loginSuccess(token: string) {
    return {
        type: '@@AUTH/LOGIN_SUCCESS' as '@@AUTH/LOGIN_SUCCESS',
        token: token
    }
}

export function getUser(userEmail: string) {
    return {
        type: '@@AUTH/GET_USER' as '@@AUTH/GET_USER',
        userEmail
    }
}

export function logout() {
    return {
        type: '@@AUTH/LOGOUT' as '@@AUTH/LOGOUT'
    }
}

export function loginFail(message: string) {
    return {
        type: '@@AUTH/LOGIN_FAIL' as '@@AUTH/LOGIN_FAIL',
        message
    }
}

type AuthAction = typeof loginSuccess | typeof getUser | typeof logout | typeof loginFail

export type IAuthAction = ReturnType<AuthAction>
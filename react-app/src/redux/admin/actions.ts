interface IAdminLoginProcessing {
  type: "@@AUTH/LOGIN_PROCESSING";
}

interface IAdminLoginSuccess {
  type: "@@AUTH/LOGIN_SUCCESS";
  token: string;
  id: number;
}

interface IAdminLoginFail {
  type: "@@AUTH/LOGIN_FAIL";
  message: string;
}

interface IAdminLogout {
  type: "@@AUTH/LOGOUT";
}

export function loginSuccess(token: string, userId: number): ILoginSuccess {
  return {
    type: "@@AUTH/LOGIN_SUCCESS" as "@@AUTH/LOGIN_SUCCESS",
    token: token,
    id: userId,
  };
}

export function checkTutor(isTutor: boolean): ICheckTutor {
  return {
    type: "@@AUTH/CHECK_TUTOR" as "@@AUTH/CHECK_TUTOR",
    isTutor,
  };
}

export function logout(): ILogout {
  return {
    type: "@@AUTH/LOGOUT" as "@@AUTH/LOGOUT",
  };
}

export function loginFail(message: string): ILoginFail {
  return {
    type: "@@AUTH/LOGIN_FAIL" as "@@AUTH/LOGIN_FAIL",
    message,
  };
}

export const loginProcessing = (): ILoginProcessing => {
  return {
    type: "@@AUTH/LOGIN_PROCESSING",
  };
};

type AuthAction =
  | typeof loginSuccess
  | typeof getUser
  | typeof checkTutor
  | typeof logout
  | typeof loginFail
  | typeof loginProcessing;

export type IAuthAction = ReturnType<AuthAction>;

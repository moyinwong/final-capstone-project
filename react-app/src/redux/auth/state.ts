export interface User {
    id: number;
    email: string;
}

export interface IAuthState {
    token: string | null;
    email: string | null;
    isAuthenticated: boolean | null;
    message: string | null;
    isTutor: boolean;
}

export const initialState: IAuthState = {
    token: localStorage.getItem('token'),
    email: null,
    isAuthenticated: null,
    message: '',
    isTutor: false
}
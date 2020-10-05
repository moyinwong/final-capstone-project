// React, React Native
import React, { createContext, useState } from 'react';
import { string } from 'yup';

export const UserContext = createContext();

interface IUser {
    email: string
}

const UserContextProvider = (props: any) => {

    const [isSignedIn, setIsSignedIn] = useState(
        false
    );

    const [user, setUser] = useState(
        {}
    );

    const userLogin = (user: IUser) => {
        setUser(user);
    };
    const userLogout = (user: IUser) => {
        setUser({});
    };

    return (
        <UserContext.Provider value={{ isSignedIn, setIsSignedIn, user, userLogin, userLogout }}>
            { props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;
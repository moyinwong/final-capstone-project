// React, React Native
import React from 'react';

// Navigation
import { createStackNavigator } from '@react-navigation/stack';

// Routes
import LeftDrawer from "../routes/drawer/leftDrawer";

// Screens
import Login from '../screens/login/login';
import SignUp from '../screens/login/signUp';

// Functions
import stackTransition from '../functions/stackTransition';

export default function OverallStack() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName="Login"
            headerMode="float"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="Login"
                children={Login}
                options={{
                    title: 'Login',
                    ...stackTransition
                }}
            />
            <Stack.Screen
                name="SignUp"
                children={SignUp}
                options={{
                    title: 'SignUp',
                    ...stackTransition
                }}
            />
            <Stack.Screen
                name="LeftDrawer"
                children={LeftDrawer}
                options={{
                    title: 'LeftDrawer',
                    ...stackTransition
                }}
            />
        </Stack.Navigator >
    )
}

// React, React Native
import React from 'react';

// Navigation
import { createStackNavigator } from '@react-navigation/stack';

// Routes
import LeftDrawer from "../routes/drawer/leftDrawer";

// Screens
import Loading from '../screens/login/loading';
import Login from '../screens/login/login';

// Functions
import stackTransition from '../functions/stackTransition';

export default function OverallStack() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName="Loading"
            headerMode="float"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="Loading"
                component={Loading}
                options={{
                    title: 'Loading',
                    ...stackTransition
                }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    title: 'Login',
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

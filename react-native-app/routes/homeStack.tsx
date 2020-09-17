import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import Home from '../screens/bottomTap/homeStack/home';
import Course from '../screens/bottomTap/categoryStack/course';
import Lesson from '../screens/bottomTap/categoryStack/lesson';
import Quiz from '../screens/bottomTap/categoryStack/quiz';

export default function HomeStack() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            headerMode="float"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#5b96f7"
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    alignSelf: 'center'
                }
            }}
        >
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ title: '首頁' }}
            />
            <Stack.Screen
                name="Course"
                component={Course}
                options={{ title: '課程' }}
            />
            <Stack.Screen
                name="Lesson"
                component={Lesson}
                options={{ title: '課堂' }}
            />
            <Stack.Screen
                name="Quiz"
                component={Quiz}
                options={{ title: '測驗' }}
            />
        </Stack.Navigator>
    )
}

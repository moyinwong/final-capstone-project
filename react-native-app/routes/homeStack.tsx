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
        <Stack.Navigator initialRouteName="Course">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Course" component={Course} />
            <Stack.Screen name="Lesson" component={Lesson} />
            <Stack.Screen name="Quiz" component={Quiz} />
        </Stack.Navigator>
    )
}

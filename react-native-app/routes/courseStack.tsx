import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import Course from '../screens/courseStack/course';
import Lesson from '../screens/courseStack/lesson';
import Quiz from '../screens/courseStack/quiz';

export default function courseStack() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator initialRouteName="Course">
            <Stack.Screen name="Course" component={Course} />
            <Stack.Screen name="Lesson" component={Lesson} />
            <Stack.Screen name="Quiz" component={Quiz} />
        </Stack.Navigator>
    )
}
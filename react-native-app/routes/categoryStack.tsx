import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import Category from '../screens/bottomTap/categoryStack/category';
import Course from '../screens/bottomTap/categoryStack/course';
import Lesson from '../screens/bottomTap/categoryStack/lesson';
import Quiz from '../screens/bottomTap/categoryStack/quiz';

export default function CategoryStack() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="Category" component={Category} />
            <Stack.Screen name="Course" component={Course} />
            <Stack.Screen name="Lesson" component={Lesson} />
            <Stack.Screen name="Quiz" component={Quiz} />
        </Stack.Navigator>
    )
}

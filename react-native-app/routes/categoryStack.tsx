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
        <Stack.Navigator
            headerMode="float"
        >
            <Stack.Screen
                name="Category"
                component={Category}
                options={{ title: '科目' }}
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

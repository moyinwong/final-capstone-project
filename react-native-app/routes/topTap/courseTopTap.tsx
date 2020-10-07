// React, React Native
import React from 'react';

// Navigation
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Screens
import CourseIntro from '../../screens/bottomTap/commonScreens/courseTopTap/courseIntro';
import CourseLessons from '../../screens/bottomTap/commonScreens/courseTopTap/courseLessons';
import CourseReviews from '../../screens/bottomTap/commonScreens/courseTopTap/courseReviews';

const Tab = createMaterialTopTabNavigator();

export default function LessonTopTab() {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: '#000000',
                inactiveTintColor: '#a5aebf',
                indicatorStyle: {
                    height: 2,
                    color: '#77fbb0'
                },
                labelStyle: {
                    fontSize: 16
                }
            }}
        >
            <Tab.Screen
                name="CourseIntro"
                component={CourseIntro}
                options={{
                    title: "課程簡介"
                }}
            />
            <Tab.Screen
                name="CourseLessons"
                component={CourseLessons}
                options={{
                    title: "課程內容"
                }}
            />
            <Tab.Screen
                name="CourseReviews"
                component={CourseReviews}
                options={{
                    title: "學生反映"
                }}
            />
        </Tab.Navigator>
    );
}

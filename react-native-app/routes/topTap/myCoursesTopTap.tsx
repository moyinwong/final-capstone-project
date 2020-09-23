// React, React Native
import React from 'react';

// Navigation
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Screens
import InProgressCourses from '../../screens/bottomTap/myCoursesStack/InProgressCourses';
import CompletedCourses from '../../screens/bottomTap/myCoursesStack/CompletedCourses';

const Tab = createMaterialTopTabNavigator();

export default function MyCoursesTopTab() {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: '#5b96f7',
                inactiveTintColor: '#a5aebf',
                indicatorStyle: {
                    height: 2,
                    color: '#5b96f7'
                },
                labelStyle: {
                    fontSize: 16
                }
            }}
        >
            <Tab.Screen
                name="InProgressCourses"
                component={InProgressCourses}
                options={{
                    title: "修讀中"
                }}
            />
            <Tab.Screen
                name="CompletedCourses"
                component={CompletedCourses}
                options={{
                    title: "已完成"
                }}
            />
        </Tab.Navigator>
    );
}

// React, React Native
import React from 'react';

// Navigation
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Screens
import MyCoursesList from '../../screens/bottomTap/myCoursesStack/MyCoursesList';

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
                component={MyCoursesList}
                initialParams={{ category: 'inProgress' }}
                options={{
                    title: "修讀中"
                }}
            />
            <Tab.Screen
                name="CompletedCourses"
                component={MyCoursesList}
                initialParams={{ category: 'completed' }}
                options={{
                    title: "已完成"
                }}
            />
        </Tab.Navigator>
    );
}

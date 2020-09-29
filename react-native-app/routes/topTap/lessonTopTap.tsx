// React, React Native
import React from 'react';

// Navigation
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Screens
import Video from '../../screens/bottomTap/commonScreens/lessonTopTap/video';
import Exercise from '../../screens/bottomTap/commonScreens/lessonTopTap/exercise';
import Materials from '../../screens/bottomTap/commonScreens/lessonTopTap/materials';

const Tab = createMaterialTopTabNavigator();

export default function LessonTopTab() {
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
                name="Video"
                component={Video}
                initialParams={{ category: 'subscribed' }}
                options={{
                    title: "影片"
                }}
            />
            <Tab.Screen
                name="Exercise"
                component={Exercise}
                initialParams={{ category: 'subscribed' }}
                options={{
                    title: "練習"
                }}
            />
            <Tab.Screen
                name="Materials"
                component={Materials}
                initialParams={{ category: 'subscribed' }}
                options={{
                    title: "教材"
                }}
            />
        </Tab.Navigator>
    );
}

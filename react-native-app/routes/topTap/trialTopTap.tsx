// React, React Native
import React from 'react';

// Navigation
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Screens
import Tutorial from '../../screens/bottomTap/commonScreens/lessonTopTap/tutorial';
import Exercise from '../../screens/bottomTap/commonScreens/lessonTopTap/exercise';
import Materials from '../../screens/bottomTap/commonScreens/lessonTopTap/materials';

const Tab = createMaterialTopTabNavigator();

export default function TrialTopTab() {
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
                name="Tutorial"
                component={Tutorial}
                options={{
                    title: "影片"
                }}
            />
            <Tab.Screen
                name="Exercise"
                component={Exercise}
                initialParams={{ viewingCondition: 'trial' }}
                options={{
                    title: "練習"
                }}
            />
            <Tab.Screen
                name="Materials"
                component={Materials}
                initialParams={{ viewingCondition: 'trial' }}
                options={{
                    title: "教材"
                }}
            />
        </Tab.Navigator>
    );
}

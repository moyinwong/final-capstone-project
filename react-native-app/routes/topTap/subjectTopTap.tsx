// React, React Native
import React from 'react';

// Navigation
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Screens
import SubjectsList from '../../screens/bottomTap/subjectStack/subjectsList';

const Tab = createMaterialTopTabNavigator();

export default function SubjectTopTab() {
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
                name="SubjectList"
                component={SubjectsList}
                initialParams={{ category: 'main' }}
                options={{
                    title: "主科"
                }}
            />
            <Tab.Screen
                name="ScienceSubject"
                component={SubjectsList}
                initialParams={{ category: 'science' }}
                options={{
                    title: "理科"
                }}
            />
            <Tab.Screen
                name="BusinessSubject"
                component={SubjectsList}
                initialParams={{ category: 'business' }}
                options={{
                    title: "商科"
                }}
            />
            <Tab.Screen
                name="LinguisticSubject"
                component={SubjectsList}
                initialParams={{ category: 'linguistic' }}
                options={{
                    title: "文科"
                }}
            />
            <Tab.Screen
                name="OtherSubject"
                component={SubjectsList}
                initialParams={{ category: 'other' }}
                options={{
                    title: "其他"
                }}
            />
        </Tab.Navigator >
    );
}

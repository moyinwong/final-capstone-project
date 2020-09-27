// React, React Native
import React from 'react';

// Navigation
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Screens
import TutorsList from '../../screens/bottomTap/tutorStack/tutorsList';

const Tab = createMaterialTopTabNavigator();

export default function TutorsTopTab() {
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
                name="SubscribedTutors"
                component={TutorsList}
                initialParams={{ category: 'subscribed' }}
                options={{
                    title: "已訂閱導師"
                }}
            />
            <Tab.Screen
                name="AllTutors"
                component={TutorsList}
                initialParams={{ category: 'all' }}
                options={{
                    title: "所有導師"
                }}
            />
        </Tab.Navigator>
    );
}

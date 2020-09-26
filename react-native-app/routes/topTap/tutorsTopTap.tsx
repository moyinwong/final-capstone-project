// React, React Native
import React from 'react';

// Navigation
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Screens
import SubscribedTutors from '../../screens/bottomTap/tutorStack/subscribedTutors';
import AllTutors from '../../screens/bottomTap/tutorStack/allTutors';

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
                component={SubscribedTutors}
                options={{
                    title: "已訂閱導師"
                }}
            />
            <Tab.Screen
                name="AllTutors"
                component={AllTutors}
                options={{
                    title: "所有導師"
                }}
            />
        </Tab.Navigator>
    );
}

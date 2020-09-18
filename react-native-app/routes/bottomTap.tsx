import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

// Icons
import { FontAwesome, AntDesign } from '@expo/vector-icons';

// Routes
import HomeStack from './homeStack';
import SubjectStack from './subjectStack';

// Screens
import Tab1 from '../screens/bottomTap/tab1';
import Tab2 from '../screens/bottomTap/tab2';

export default function BottomTap() {
    const Tab = createMaterialBottomTabNavigator();

    return (
        <Tab.Navigator
            activeColor="#5b96f7"
            inactiveColor="#9da0a8"
            barStyle={{
                backgroundColor: '#ffffff'
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{
                    tabBarLabel: '首頁',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="home" color={color} size={24} />
                    ),
                }}
            />
            <Tab.Screen
                name="Subject"
                children={SubjectStack}
                options={{
                    tabBarLabel: '科目',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="list" color={color} size={24} />
                    ),
                }}
            />
            <Tab.Screen
                name="Tab1"
                component={Tab1}
                options={{
                    tabBarLabel: 'Tab 1',
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="areachart" color={color} size={24} />
                    ),
                }}
            />
            <Tab.Screen
                name="Tab2"
                component={Tab2}
                options={{
                    tabBarLabel: 'Tab 2',
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="team" color={color} size={24} />
                    ),
                }}
            />
        </Tab.Navigator >
    )
}

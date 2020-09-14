import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

// Icons
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

// Routes
import HomeStack from './homeStack';
import CategoryStack from './categoryStack';

// Screens
import Tab1 from '../screens/bottomTap/tab1';
import Tab2 from '../screens/bottomTap/tab2';

export default function BottomTap() {
    const Tab = createMaterialBottomTabNavigator();

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: () => (
                        <FontAwesome name="home" size={24} />
                    ),
                }}
            />
            <Tab.Screen
                name="Category"
                children={CategoryStack}
                options={{
                    tabBarLabel: 'Category',
                    tabBarIcon: () => (
                        <FontAwesome name="list" size={24} />
                    ),
                }}
            />
            <Tab.Screen
                name="Tab1"
                component={Tab1}
                options={{
                    tabBarLabel: 'Tab 1',
                    tabBarIcon: () => (
                        <AntDesign name="areachart" size={24} />
                    ),
                }}
            />
            <Tab.Screen
                name="Tab2"
                component={Tab2}
                options={{
                    tabBarLabel: 'Tab 2',
                    tabBarIcon: () => (
                        <AntDesign name="team" size={24} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

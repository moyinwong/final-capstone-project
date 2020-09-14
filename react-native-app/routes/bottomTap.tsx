import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

// Routes
import courseStack from './courseStack';

// Screens
import Home from '../screens/bottomTap/home';
import Tab1 from '../screens/bottomTap/tab1';
import Tab2 from '../screens/bottomTap/tab2';

export default function bottomTap() {
    const MaterialBottomTabs = createMaterialBottomTabNavigator();

    return (
        <MaterialBottomTabs.Navigator>
            <MaterialBottomTabs.Screen name="Home" component={Home} />
            <MaterialBottomTabs.Screen name="Tab1" component={Tab1} />
            <MaterialBottomTabs.Screen name="Tab2" component={Tab2} />
            <MaterialBottomTabs.Screen name="CourseStack" children={courseStack} />
        </MaterialBottomTabs.Navigator>
    )
}
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer'

// Routes
import bottomTap from './bottomTap';

// Screens
import Feedback from '../screens/leftDrawer/feedback';

export default function leftDrawer() {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator>
            <Drawer.Screen name="bottomTap" children={bottomTap} />
            <Drawer.Screen name="feedback" component={Feedback} />
        </Drawer.Navigator>
    )
}
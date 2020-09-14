import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer'

// Routes
import BottomTap from './bottomTap';

// Screens
import Feedback from '../screens/leftDrawer/feedback';

export default function LeftDrawer() {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator>
            <Drawer.Screen name="BottomTap" children={BottomTap} />
            <Drawer.Screen name="Feedback" component={Feedback} />
        </Drawer.Navigator>
    )
}

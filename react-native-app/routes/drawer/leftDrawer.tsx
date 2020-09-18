import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'

// Icons
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

// Routes
import BottomTap from '../bottomTap/bottomTap';

// Screens
import Feedback from '../../screens/leftDrawer/feedback';

export default function LeftDrawer() {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator
            drawerType={'front'}
            drawerContent={props => {
                return (
                    <DrawerContentScrollView {...props}>
                        <DrawerItemList {...props} />
                        <DrawerItem label="登出"
                            icon={({ color }) => <MaterialCommunityIcons name="logout" color={color} size={24} />}
                            onPress={() => props.navigation.navigate("Home")}
                        />
                    </DrawerContentScrollView>
                )
            }}
        >
            <Drawer.Screen name="BottomTap" children={BottomTap}
                options={{
                    title: '主頁',
                    drawerIcon: ({ color }) => (
                        <FontAwesome name="home" color={color} size={24} />
                    ),
                }}
            />
            <Drawer.Screen name="Feedback" component={Feedback}
                options={{
                    title: '提交意見',
                    drawerIcon: ({ color }) => (
                        <MaterialIcons name="feedback" color={color} size={24} />
                    ),
                }}
            />
        </Drawer.Navigator>
    )
}

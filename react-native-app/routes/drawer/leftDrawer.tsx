import React from 'react';
import { Alert } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'

// Icons
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

// Routes
import BottomTap from '../bottomTap/bottomTap';

// Screens
import Feedback from '../../screens/leftDrawer/feedback';

export default function LeftDrawer() {
    const Drawer = createDrawerNavigator();

    function logoutAlert() {
        Alert.alert(
            "登出",
            "確認要登出嗎？",
            [
                {
                    text: "取消",
                    onPress: () => console.log("取消"),
                    style: "cancel"
                },
                { text: "登出", onPress: () => console.log("登出") }
            ],
            { cancelable: true }
        )
    }

    return (
        <Drawer.Navigator
            drawerType={'front'}
            drawerContent={props => {
                return (
                    <DrawerContentScrollView {...props}>
                        <DrawerItemList {...props} />
                        <DrawerItem label="登出"
                            icon={({ color }) => <MaterialCommunityIcons name="logout" color={color} size={24} />}
                            onPress={() => logoutAlert()}
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

// React, React Native
import React, { useContext } from 'react';
import { Alert } from 'react-native';
import * as Linking from 'expo-linking';

// Context
import { UserContext } from '../../contexts/userContext';

// Navigation
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native';

// Icons
import { FontAwesome, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

// Routes
import BottomTap from '../bottomTap/bottomTap';

// Data
import AsyncStorage from '@react-native-community/async-storage';

export default function LeftDrawer() {

    const Drawer = createDrawerNavigator();

    // Hooks
    const navigation = useNavigation();

    // Context
    const { setUser } = useContext(UserContext);

    // Log User out from Storage & Context
    const logUserOut = async () => {
        try {

            const user = {
                "email": null,
                "isTutor": null,
                "token": null,
                "userId": null,
            }

            const userJSON = JSON.stringify(user);
            setUser(userJSON);
            await AsyncStorage.setItem('userKey', userJSON);

            console.log('已登出');
            navigation.navigate('Login');
        } catch (err) {
            console.log(err);
        }
    }

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
                { text: "登出", onPress: () => logUserOut() }
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
                        <DrawerItem label="瀏灠網站"
                            icon={({ color }) => <Entypo name="browser" color={color} size={24} />}
                            onPress={() => Linking.openURL(`https://e-ducate.life`)}
                        />
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
        </Drawer.Navigator>
    )
}

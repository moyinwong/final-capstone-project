// React, React Native
import React, { useContext } from 'react';
import { View, Text, Pressable, TextInput, Alert, Keyboard } from 'react-native';
import { Formik } from 'formik';
import { LinearGradient } from 'expo-linear-gradient';
import * as Linking from 'expo-linking';

// Context
import { UserContext } from '../../contexts/userContext';

// Navigation
import { useNavigation } from '@react-navigation/native';

// Styles
import globalStyles from '../../styles/globalStyles';
import loginStyles from '../../styles/loginStyles';

// Data
import envData from '../../data/env';
import AsyncStorage from '@react-native-community/async-storage';

// Interface
import IUser from '../../Interfaces/IUser';

export default function Login() {

    // Context
    const { setUser } = useContext(UserContext);

    // Hooks
    const navigation = useNavigation();

    // Submit Log In
    async function submitLogin(email: string, password: string) {
        let queryRoute = '/user/login';
        const res = await fetch(`${envData.REACT_APP_BACKEND_URL}${queryRoute}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        console.log(res.status);

        if (res.status == 200) {
            const json = await res.json();
            setUser(json);

            // Store User
            storeUser(json);

            console.log('已登入');
            navigation.navigate('LeftDrawer');
        } else {
            Alert.alert(
                "登入錯誤",
                "電郵地址/密碼錯誤",
                [
                    {
                        text: "取消",
                        onPress: () => console.log("取消"),
                        style: "cancel"
                    }
                ],
                { cancelable: true }
            )
        }
    }

    // Store User
    const storeUser = async (user: IUser) => {
        try {
            const userJSON = JSON.stringify(user)
            await AsyncStorage.setItem('userKey', userJSON)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <View style={{ ...globalStyles.container, paddingHorizontal: 0 }}>

            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={(values) => {
                    submitLogin(values.email, values.password)
                }}
            >

                {(props) => (
                    <Pressable
                        style={loginStyles.wholeScreenContainer}
                        onPress={Keyboard.dismiss}
                    >
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['rgba(119, 251, 176, 1)', 'rgba(166, 241, 141, 1)']}
                            style={loginStyles.linearGradient}
                        >
                        </LinearGradient>

                        <View style={loginStyles.form}>
                            <Text style={loginStyles.title}>登入帳戶</Text>

                            <TextInput
                                style={loginStyles.input}
                                placeholder='電郵地址'
                                onChangeText={props.handleChange('email')}
                                value={props.values.email}
                            />
                            <TextInput
                                style={loginStyles.input}
                                secureTextEntry={true}
                                placeholder='密碼'
                                onChangeText={props.handleChange('password')}
                                value={props.values.password}
                            />

                            <Pressable
                                style={loginStyles.logInButton}
                                onPress={props.handleSubmit}
                            >
                                <Text style={loginStyles.buttonText}>登入</Text>
                            </Pressable>

                            <Pressable
                                style={loginStyles.button}
                                onPress={() => { Keyboard.dismiss, Linking.openURL(`https://e-ducate.life/signup`) }}
                            >
                                <Text style={{ ...loginStyles.buttonText, color: '#5b96f7' }}>未有帳戶? 立刻註冊</Text>
                            </Pressable>

                        </View>

                    </Pressable>
                )}

            </Formik>

        </View>
    )
}

// React, React Native
import React, { useContext, useCallback } from 'react';
import { View, Text, Pressable, TextInput, Alert } from 'react-native';
import { Formik } from 'formik';

// Context
import { UserContext } from '../../contexts/userContext';

// Navigation
import { useNavigation, useFocusEffect } from '@react-navigation/native';

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

    // Store User
    const storeUser = async (user: IUser) => {
        try {
            const userJSON = JSON.stringify(user)
            await AsyncStorage.setItem('userKey', userJSON)
        } catch (err) {
            console.log(err);
        }
    }

    // Get User from Storage
    const getUser = async () => {
        try {
            const jsonString = await AsyncStorage.getItem('userKey')
            const jsonObject = await JSON.parse(jsonString);
            if (jsonObject != null) {

                if (jsonObject.token != null) {
                    setUser(jsonObject);

                    console.log('已自動登入');
                    navigation.navigate('LeftDrawer');
                    return jsonObject
                }

                return null
            } else {
                return null
            }
        } catch (err) {
            console.log(err)
        }
    }

    // Submit Function
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

    // If User stored in Storage
    const nothing = 'nothing'
    useFocusEffect(
        useCallback(() => {
            getUser()
        }, [nothing])
    );

    return (
        <View style={{ ...globalStyles.container, ...loginStyles.form }}>
            <Text style={loginStyles.title}>登入帳戶</Text>

            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={(values) => {
                    submitLogin(values.email, values.password)
                }}
            >

                {(props) => (
                    <View>
                        <TextInput
                            style={loginStyles.input}
                            placeholder='電郵地址'
                            onChangeText={props.handleChange('email')}
                            value={props.values.email}
                        />
                        <TextInput
                            style={loginStyles.input}
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

                    </View>
                )}

            </Formik>

            <Pressable
                style={loginStyles.button}
                onPress={() => navigation.navigate('SignUp')}
            >
                <Text style={{ ...loginStyles.buttonText, color: '#5b96f7' }}>未有帳戶? 立刻註冊</Text>
            </Pressable>

        </View >
    )
}

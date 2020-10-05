// React, React Native
import React, { useContext } from 'react';
import { View, Text, Pressable, TextInput, Keyboard } from 'react-native';
import { Formik } from 'formik';
import { LinearGradient } from 'expo-linear-gradient';

// Context
import { UserContext } from '../../contexts/userContext';

// Navigation
import { useNavigation } from '@react-navigation/native';

// Styles
import globalStyles from '../../styles/globalStyles';
import loginStyles from '../../styles/loginStyles';


export default function SignUp() {

    // Context
    const { setIsSignedIn } = useContext(UserContext);

    // Hooks
    const navigation = useNavigation();

    return (
        <View style={{ ...globalStyles.container, paddingHorizontal: 0 }}>

            <Formik
                initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
                onSubmit={(values) =>
                    console.log(values)
                }
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
                            <Text style={loginStyles.title}>註冊</Text>

                            <TextInput
                                style={loginStyles.input}
                                placeholder='名'
                                onChangeText={props.handleChange('firstName')}
                                value={props.values.firstName}
                            />
                            <TextInput
                                style={loginStyles.input}
                                placeholder='姓'
                                onChangeText={props.handleChange('lastName')}
                                value={props.values.lastName}
                            />
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
                                <Text style={loginStyles.buttonText}>註冊</Text>
                            </Pressable>

                            <Pressable
                                style={loginStyles.button}
                                onPress={() => { Keyboard.dismiss, navigation.navigate('Login') }}
                            >
                                <Text style={{ ...loginStyles.buttonText, color: '#5b96f7' }}>已擁有帳戶? 立刻登入</Text>
                            </Pressable>

                        </View>

                    </Pressable>
                )}

            </Formik>

        </View >
    )

}

// React, React Native
import React, { useContext } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { Formik } from 'formik';

// Context
import { UserContext } from '../../contexts/userContext';

// Navigation
import { useNavigation } from '@react-navigation/native';

// Styles
import globalStyles from '../../styles/globalStyles';
import loginStyles from '../../styles/loginStyles';

export default function Login() {

    // Context
    const { setIsSignedIn } = useContext(UserContext);

    // Hooks
    const navigation = useNavigation();

    return (
        <View style={{ ...globalStyles.container, paddingTop: 30 }}>
            <Text style={loginStyles.title}>登入帳戶</Text>

            <Formik
                style={loginStyles.form}
                initialValues={{ email: '', password: '' }}
                onSubmit={(values) =>
                    console.log(values)
                }
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

        </View>
    )
}

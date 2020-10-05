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


export default function SignUp() {

    // Context
    const { setIsSignedIn } = useContext(UserContext);

    // Hooks
    const navigation = useNavigation();

    return (
        <View style={{ ...globalStyles.container, paddingTop: 30 }}>
            <Text>註冊</Text>

            <Formik
                initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
                onSubmit={(values) =>
                    console.log(values)
                }
            >

                {(props) => (
                    <View>
                        <TextInput
                            placeholder='名'
                            onChangeText={props.handleChange('firstName')}
                            value={props.values.firstName}
                        />
                        <TextInput
                            placeholder='姓'
                            onChangeText={props.handleChange('lastName')}
                            value={props.values.lastName}
                        />
                        <TextInput
                            placeholder='電郵地址'
                            onChangeText={props.handleChange('email')}
                            value={props.values.email}
                        />
                        <TextInput
                            placeholder='密碼'
                            onChangeText={props.handleChange('password')}
                            value={props.values.password}
                        />
                        <Pressable
                            onPress={props.handleSubmit}
                        >
                            <Text>註冊</Text>
                        </Pressable>

                    </View>
                )}

            </Formik>

            <Pressable
                onPress={() => navigation.navigate('Login')}
            >
                <Text>已擁有帳戶? 立刻登入</Text>
            </Pressable>

        </View>
    )
}

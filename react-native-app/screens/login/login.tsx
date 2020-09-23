// React, React Native
import React from 'react';
import { View, Text } from 'react-native';

// Screens
import SignIn from './signIn';
import SignUp from './signUp';

// Styles
import globalStyles from '../../styles/globalStyles';

// Dummy variable
const showSignInScreen = true;

export default function Login() {
    return (
        <View style={globalStyles.container}>
            <Text>Login Screen</Text>
            {showSignInScreen ? (
                <SignIn />
            ) : (
                    <SignUp />
                )}
        </View>
    )
}

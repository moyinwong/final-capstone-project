// React, React Native
import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

// Screens
import SignIn from './signIn';
import SignUp from './signUp';

// Styles
import globalStyles from '../../styles/globalStyles';
import loginStyles from '../../styles/loginStyeles';

export default function Login() {

    // State
    const [showSignInScreen, setShowSignInScreen] = useState(
        true
    );

    return (
        <View style={{ ...globalStyles.container, paddingTop: 30 }}>
            <Text>Login Screen</Text>
            <Pressable
                style={loginStyles.signInUpToggle}
                onPress={() => { setShowSignInScreen(true) }}
            >
                <Text>Click to Sign In</Text>
            </Pressable>
            <Pressable
                style={loginStyles.signInUpToggle}
                onPress={() => { setShowSignInScreen(false) }}
            >
                <Text>Click to Sign Up</Text>
            </Pressable>
            {showSignInScreen ? (
                <SignIn />
            ) : (
                    <SignUp />
                )}
        </View>
    )
}

// React, React Native
import React, { useContext } from 'react';
import { View, Text, Pressable } from 'react-native';

// Context
import { UserContext } from '../../contexts/userContext';

// Navigation
import { useNavigation } from '@react-navigation/native';

// Styles
import globalStyles from '../../styles/globalStyles';
import loginStyles from '../../styles/loginStyeles';

export default function Login() {

    // Context
    const { setIsSignedIn } = useContext(UserContext);

    // Hooks
    const navigation = useNavigation();

    return (
        <View style={{ ...globalStyles.container, paddingTop: 30 }}>
            <Text>登入帳戶</Text>

            <Pressable
                style={loginStyles.signInUpToggle}
                onPress={() => navigation.navigate('LeftDrawer')}
            >
                <Text>登入</Text>
            </Pressable>

            <Pressable
                style={loginStyles.signInUpToggle}
                onPress={() => navigation.navigate('SignUp')}
            >
                <Text>未有帳戶? 立刻註冊</Text>
            </Pressable>

        </View>
    )
}

// React, React Native
import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Navigation
import { useNavigation, useFocusEffect } from '@react-navigation/native';

// Icons
import { Entypo } from '@expo/vector-icons';

// Styles
import globalStyles from '../../../styles/globalStyles';
import loadingStyles from '../../../styles/loadingStyle';

export default function PaymentFail() {

    // Hooks
    const navigation = useNavigation();

    // Redirect to Home Screen
    const nothing = 'nothing';
    useFocusEffect(
        useCallback(() => {
            setTimeout(() => {
                navigation.navigate('Cart',
                    { screen: 'Cart' }
                )
            }, 1200)
        }, [nothing])
    );

    return (
        <View style={{ ...globalStyles.container, paddingHorizontal: 0 }}>
            <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={['rgba(119, 251, 176, 1)', 'rgba(166, 241, 141, 1)']}
                style={loadingStyles.linearGradient}
            >
            </LinearGradient>
            <View style={loadingStyles.logoContainer}>
                <Entypo name="cross" size={62} color="#e96a43" />
                <Text style={loadingStyles.slogan}>付款失敗, 請再試一次</Text>
            </View>
        </View>
    )
}

// React, React Native
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Styles
import globalStyles from '../../../styles/globalStyles';
import loadingStyles from '../../../styles/loadingStyle';

export default function PaymentLoading() {

    return (
        <View style={{ ...globalStyles.container, paddingHorizontal: 0 }}>
            <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={['rgba(119, 251, 176, 1)', 'rgba(166, 241, 141, 1)']}
                style={loadingStyles.linearGradient}
            >
            </LinearGradient>
            <View style={loadingStyles.logoContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={loadingStyles.slogan}>處理中...</Text>
            </View>
        </View>
    )
}

// React, React Native
import React, { useContext, useCallback } from 'react';
import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Context
import { UserContext } from '../../contexts/userContext';
import { CartContext } from '../../contexts/cartContext';

// Navigation
import { useNavigation, useFocusEffect } from '@react-navigation/native';

// Styles
import globalStyles from '../../styles/globalStyles';
import loadingStyles from '../../styles/loadingStyle';

// Data
import AsyncStorage from '@react-native-community/async-storage';

export default function Loading() {

    // Context
    const { setUser } = useContext(UserContext);
    const { setCartList, setCartSum } = useContext(CartContext);

    // Hooks
    const navigation = useNavigation();

    // Get User from Storage
    const getUser = async () => {
        try {
            const jsonString = await AsyncStorage.getItem('userKey')

            if (jsonString) {
                const jsonObject = await JSON.parse(jsonString);
                if (jsonObject != null) {

                    if (jsonObject.token != null) {
                        setUser(jsonObject);

                        console.log('已自動登入');
                        navigation.navigate('LeftDrawer');
                        return jsonObject
                    }

                }
            }
            navigation.navigate('Login');
            return null

        } catch (err) {
            console.log(err)
        }
    }

    // Get Cart List from Storage
    const getCartList = async () => {
        try {
            const jsonString = await AsyncStorage.getItem('cartListKey')

            if (jsonString) {
                const jsonObject = await JSON.parse(jsonString);
                setCartList(jsonObject);
            }
            return null

        } catch (err) {
            console.log(err)
        }
    }
    const getCartSum = async () => {
        try {
            const numString = await AsyncStorage.getItem('cartSumKey')

            if (numString) {
                const numObject = await parseInt(numString);
                setCartSum(numObject);
            }
            return null

        } catch (err) {
            console.log(err)
        }
    }

    // Check if User stored in Storage
    const nothing = 'nothing'
    useFocusEffect(
        useCallback(() => {
            setTimeout(() => {
                getUser()
                getCartList()
                getCartSum()
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
                <Image
                    style={loadingStyles.logoPic}
                    resizeMode='cover'
                    source={require('../../assets/logoTrans.png')}
                />
                <Text style={loadingStyles.slogan}>多種課程等緊你...</Text>
            </View>
        </View>
    )
}

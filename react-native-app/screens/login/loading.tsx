// React, React Native
import React, { useContext, useCallback } from 'react';
import { View, Text } from 'react-native';

// Context
import { UserContext } from '../../contexts/userContext';

// Navigation
import { useNavigation, useFocusEffect } from '@react-navigation/native';

// Styles
import globalStyles from '../../styles/globalStyles';

// Data
import AsyncStorage from '@react-native-community/async-storage';

export default function Loading() {

    // Context
    const { setUser } = useContext(UserContext);

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

    // Check if User stored in Storage
    const nothing = 'nothing'
    useFocusEffect(
        useCallback(() => {
            setTimeout(() => {
                getUser()
            }, 1200)
        }, [nothing])
    );

    return (
        <View style={{ ...globalStyles.container, paddingTop: 30 }}>
            <Text>Loading Screen</Text>
        </View>
    )
}

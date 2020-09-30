// React, React Native
import React from 'react';
import { View, Text } from 'react-native';

// Styles
import globalStyles from '../../../styles/globalStyles';

export default function Cart(props: { navigation: { goBack: () => void; }; }) {

    // Hooks

    return (
        <View style={globalStyles.container}>
            <Text>Cart Screen</Text>
        </View>
    )
}

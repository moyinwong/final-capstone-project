// React, React Native
import React from 'react';
import { View, Text } from 'react-native';

// Styles
import globalStyles from '../../../../styles/globalStyles';

export default function Exercise(props: { navigation: { goBack: () => void; }; }) {

    // Hooks

    return (
        <View style={globalStyles.container}>
            <Text>Exercise Screen</Text>
        </View>
    )
}

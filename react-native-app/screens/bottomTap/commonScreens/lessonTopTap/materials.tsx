// React, React Native
import React from 'react';
import { View, Text } from 'react-native';

// Styles
import globalStyles from '../../../../styles/globalStyles';

export default function Materials(props: { navigation: { goBack: () => void; navigate: (arg0: string) => void; }; }) {

    // Hooks

    return (
        <View style={globalStyles.container}>
            <Text>Materials Screen</Text>
        </View>
    )
}

// React, React Native
import React from 'react';
import { View, Text, Button } from 'react-native';

// Navigation
import { useNavigation, useRoute } from '@react-navigation/native';

// Styles
import globalStyles from '../../../styles/globalStyles';

export default function Quiz(props: { navigation: { goBack: () => void; }; }) {

    // Hooks
    const navigation = useNavigation();

    return (
        <View style={globalStyles.container}>
            <Text>Quiz Screen</Text>
            <Button
                title="Go Back to Lesson"
                onPress={() => navigation.goBack()}
            />
        </View>
    )
}

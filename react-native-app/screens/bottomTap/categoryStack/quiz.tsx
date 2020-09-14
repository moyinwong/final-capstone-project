import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Styles
import globalStyles from '../../../styles/globalStyles';

export default function Quiz() {
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

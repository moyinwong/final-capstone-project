import React from 'react';
import { View, Text, Button } from 'react-native';

// Styles
import globalStyles from '../../../styles/globalStyles';

export default function Quiz(props: { navigation: { goBack: () => void; }; }) {

    return (
        <View style={globalStyles.container}>
            <Text>Quiz Screen</Text>
            <Button
                title="Go Back to Lesson"
                onPress={() => props.navigation.goBack()}
            />
        </View>
    )
}

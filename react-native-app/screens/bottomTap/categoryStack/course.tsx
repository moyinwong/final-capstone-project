import React from 'react';
import { View, Text, Button } from 'react-native';

// Styles
import globalStyles from '../../../styles/globalStyles';

export default function Course(props: { navigation: { navigate: (arg0: string) => void; }; }) {

    return (
        <View style={globalStyles.container}>
            <Text>Course Screen</Text>
            <Button
                title="Go to Lesson"
                onPress={() => props.navigation.navigate('Lesson')}
            />
        </View>
    )
}

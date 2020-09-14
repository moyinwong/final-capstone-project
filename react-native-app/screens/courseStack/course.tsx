import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Styles
import globalStyles from '../../styles/globalStyles';

export default function Course() {
    const navigation = useNavigation();

    return (
        <View style={globalStyles.container}>
            <Text>Course Screen</Text>
            <Button
                title="Go to Lesson"
                onPress={() => navigation.navigate('Lesson')}
            />
        </View>
    )
}

// React, React Native
import React from 'react';
import { View, Text, Button } from 'react-native';

// Navigation
import { useNavigation, useRoute } from '@react-navigation/native';

// Styles
import globalStyles from '../../../styles/globalStyles';

export default function Lesson(props: { navigation: { goBack: () => void; navigate: (arg0: string) => void; }; }) {

    // Hooks
    const navigation = useNavigation();

    return (
        <View style={globalStyles.container}>
            <Text>Lesson Screen</Text>
            <Button
                title="Go Back to Course"
                onPress={() => navigation.goBack()}
            />
            <Button
                title="Go to Exercise"
                onPress={() => navigation.navigate('Exercise')}
            />
        </View>
    )
}

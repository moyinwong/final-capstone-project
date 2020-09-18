import React from 'react';
import { View, Text, Button } from 'react-native';

// Styles
import globalStyles from '../../../styles/globalStyles';

export default function Lesson(props: { navigation: { goBack: () => void; navigate: (arg0: string) => void; }; }) {

    return (
        <View style={globalStyles.container}>
            <Text>Lesson Screen</Text>
            <Button
                title="Go Back to Course"
                onPress={() => props.navigation.goBack()}
            />
            <Button
                title="Go to Quiz"
                onPress={() => props.navigation.navigate('Quiz')}
            />
        </View>
    )
}

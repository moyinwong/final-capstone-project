// Components
import React from 'react';
import { View, Text, Button } from 'react-native';

// Navigation
import { useNavigation, useRoute } from '@react-navigation/native';

// Styles
import globalStyles from '../../../styles/globalStyles';

export default function Course(props: { navigation: { navigate: (arg0: string) => void; }; }) {

    const navigation = useNavigation();
    const route = useRoute();

    let courseData = {
        subject: null,
        tutor: null
    }

    courseData = route.params;

    return (
        <View style={globalStyles.container}>
            <Text>{courseData.subject ? courseData.subject : courseData.tutor}</Text>
            <Button
                title="Go to Lesson"
                onPress={() => navigation.navigate('Lesson')}
            />
        </View>
    )
}

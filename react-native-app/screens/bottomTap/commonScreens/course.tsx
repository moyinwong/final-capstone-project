// Components
import React from 'react';
import { View, Text, Button } from 'react-native';

// Navigation
import { useNavigation, useRoute } from '@react-navigation/native';

// Styles
import globalStyles from '../../../styles/globalStyles';

export default function Courses(props: { navigation: { navigate: (arg0: string) => void; }; }) {

    const navigation = useNavigation();
    const route = useRoute();

    interface ICourseData {
        title?: string | null
    }

    let courseData: ICourseData = {
        title: null
    }

    if (route.params) {
        courseData = route.params;
    }

    return (
        <View style={globalStyles.container}>
            <Text>{courseData.title}</Text>
            <Button
                title="Go to Lesson"
                onPress={() => navigation.navigate('Lesson')}
            />
        </View>
    )
}

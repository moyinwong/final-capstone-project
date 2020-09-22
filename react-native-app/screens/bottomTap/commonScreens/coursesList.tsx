// Components
import React from 'react';
import { View, Text, Button } from 'react-native';

// Navigation
import { useNavigation, useRoute } from '@react-navigation/native';

// Styles
import globalStyles from '../../../styles/globalStyles';

export default function CoursesList(props: { navigation: { navigate: (arg0: string) => void; }; }) {

    const navigation = useNavigation();
    const route = useRoute();

    interface ICourseData {
        subject?: string | null
        tutor?: string | null
        user?: string | null
        completedCourse?: boolean | null
    }

    let courseData: ICourseData = {
        subject: null,
        tutor: null,
        user: null,
        completedCourse: null
    }

    if (route.params) {
        courseData = route.params;
    }

    return (
        <View style={globalStyles.container}>
            <Text>{courseData.subject ? courseData.subject : courseData.tutor}</Text>
            <Button
                title="Go to Course"
                onPress={() => navigation.navigate('Course', { title: "Tecky" })}
            />
        </View>
    )
}

// React, React Native
import React from 'react';
import { View, Text, Button } from 'react-native';

// Navigation
import { useNavigation, useRoute } from '@react-navigation/native';

// Styles
import globalStyles from '../../../styles/globalStyles';

export default function Courses(props: { navigation: { navigate: (arg0: string) => void; }; }) {

    const navigation = useNavigation();
    const route = useRoute();

    interface ICourseParam {
        title?: string | null
    }

    let courseParam: ICourseParam = {
        title: null
    }

    if (route.params) {
        courseParam = route.params;
    }

    return (
        <View style={globalStyles.container}>
            <Text>{courseParam.title}</Text>
            <Button
                title="Go to Lesson"
                onPress={() => navigation.navigate('Lesson')}
            />
        </View>
    )
}

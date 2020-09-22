// Components
import React from 'react';
import { View, Text, Button } from 'react-native';

// Navigation
import { useNavigation, useRoute } from '@react-navigation/native';

// Styles
import globalStyles from '../../../styles/globalStyles';

export default function CompletedCourses(props: { navigation: { navigate: (arg0: string) => void; }; }) {

    const navigation = useNavigation();

    return (
        <View style={globalStyles.container}>
            <Text>已完成課程</Text>
            <Button
                title="Go to Course"
                onPress={() => navigation.navigate('Course')}
            />
        </View>
    )
}

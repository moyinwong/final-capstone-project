// React, React Native
import React from 'react';
import { View, Text, Button } from 'react-native';

// Navigation
import { useNavigation, useRoute } from '@react-navigation/native';

// Styles
import globalStyles from '../../../styles/globalStyles';

export default function InProgressCourses(props: { navigation: { navigate: (arg0: string) => void; }; }) {

    // Hooks
    const navigation = useNavigation();

    return (
        <View style={globalStyles.container}>
            <Text>修讀中課程</Text>
            <Button
                title="Go to Course"
                onPress={() => navigation.navigate('Course', { title: "修讀中"})}
            />
        </View>
    )
}

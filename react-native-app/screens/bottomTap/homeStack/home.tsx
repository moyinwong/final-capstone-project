import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Styles
import globalStyles from '../../../styles/globalStyles';

export default function Home() {
    const navigation = useNavigation();

    return (
        <View style={globalStyles.container}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Course"
                onPress={() => navigation.navigate('Course', { title: "Tecky Home" })}
            />
        </View>
    )
}

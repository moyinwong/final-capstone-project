import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Styles
import globalStyles from '../../../styles/globalStyles';

export default function Category() {
    const navigation = useNavigation();

    return (
        <View style={globalStyles.container}>
            <Text>Category Screen</Text>
            <Button
                title="Go to Course"
                onPress={() => navigation.navigate('Course')}
            />
        </View>
    )
}

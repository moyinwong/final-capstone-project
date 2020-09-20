import React from 'react';
import { View, Text, Button } from 'react-native';

// Styles
import globalStyles from '../../../styles/globalStyles';

export default function otherSubject(props: { navigation: { navigate: (arg0: string) => void; }; }) {

    return (
        <View style={globalStyles.container}>
            <Text>其他</Text>
            <Button
                title="Go to Course"
                onPress={() => props.navigation.navigate('Course')}
            />
        </View>
    )
}

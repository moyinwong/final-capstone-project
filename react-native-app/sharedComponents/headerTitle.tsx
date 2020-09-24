// React, React Native
import React from 'react';
import { View, Text } from 'react-native';

// Styles
import headerTitleStyles from '../styles/headerTitleStyles';

export default function HeaderTitle(param: { title: string }) {

    return (
        <View>
            <Text style={headerTitleStyles.titleText}>{param.title}</Text>
        </View>
    )
};

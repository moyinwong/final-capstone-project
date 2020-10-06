// React, React Native
import { StyleSheet } from 'react-native';

const cartIconStyles = StyleSheet.create({
    numberContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: -6,
        right: -10
    },
    number: {
        fontSize: 16,
        color: '#e96a43'
    }
});

export default cartIconStyles;

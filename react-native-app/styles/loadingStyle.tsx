// React, React Native
import { StyleSheet } from 'react-native';

const loadingStyles = StyleSheet.create({
    linearGradient: {
        height: '100%',
        width: '100%',
        position: 'relative'
    },
    logoContainer: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoPic: {
        height: 400,
        width: 400,
        zIndex: 1
    },
    slogan: {
        fontSize: 23,
        color: '#656565'
    }
});

export default loadingStyles;

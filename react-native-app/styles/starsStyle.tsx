// React, React Native
import { StyleSheet } from 'react-native';

const starsStyles = StyleSheet.create({
    starsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingTop: 1
    },
    star: {
        position: 'absolute',
        top: 0,
        left: 0
    },
    starEmpty: {
        position: 'relative'
    }
});

export default starsStyles;

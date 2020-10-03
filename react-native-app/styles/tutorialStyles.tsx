// React, React Native
import { StyleSheet } from 'react-native';

const tutorialStyles = StyleSheet.create({
    videoContainer: {
        height: 280,
        width: '100%',
        marginTop: 18
    },
    videoTextContainer: {
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 18,
        backgroundColor: '#ffffff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    videoText: {
        fontSize: 20
    }
});

export default tutorialStyles;

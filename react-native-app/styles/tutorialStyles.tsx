// React, React Native
import { StyleSheet } from 'react-native';

const tutorialStyles = StyleSheet.create({
    goBackButton: {
        marginTop: 8,
        marginLeft: 8,
        paddingVertical: 8,
        width: 100
    },
    goBackText: {
        fontSize: 18,
        color: '#5b96f7'
    },
    videoContainer: {
        height: 280,
        width: '100%',
        marginTop: 10
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

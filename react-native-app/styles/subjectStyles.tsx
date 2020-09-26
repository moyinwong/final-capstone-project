// React, React Native
import { StyleSheet } from 'react-native';

const subjectStyles = StyleSheet.create({
    flatList: {
        flex: 1
    },
    subjectBox: {
        position: 'relative',
        height: 100,
        marginVertical: 10,
        marginHorizontal: 10,
        borderTopLeftRadius: 24,
        borderBottomLeftRadius: 12,
        borderTopRightRadius: 12,
        borderBottomRightRadius: 24,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    linearGradient: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1
    },
    subjectPic: {
        width: '100%',
        height: '100%'
    },
    subjectTitle: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 20,
        textAlignVertical: 'center',
        fontSize: 30,
        zIndex: 2,
        color: '#ffffff'
    }
});

export default subjectStyles;

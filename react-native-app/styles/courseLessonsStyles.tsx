// React, React Native
import { StyleSheet } from 'react-native';

const courseLessonsStyles = StyleSheet.create({
    infoBox: {
        marginTop: 3,
        marginBottom: 12,
        marginHorizontal: 2,
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'column',
        paddingVertical: 10,
        paddingHorizontal: 10,
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
    infoText: {
        marginVertical: 3,
        fontSize: 18
    },
    lessonBox: {
        marginVertical: 3
    },
    lessonText: {
        fontSize: 18,
        color: '#5b96f7'
    },
    trialTextContainer: {
        marginTop: 6,
        width: 135,
        borderColor: '#22c736',
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    trialText: {
        fontSize: 18,
        color: '#22c736'
    },
    separator: {
        marginVertical: 10,
        width: '100%',
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1
    }
});

export default courseLessonsStyles;

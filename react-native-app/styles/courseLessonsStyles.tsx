// React, React Native
import { StyleSheet } from 'react-native';

const courseLessonsStyles = StyleSheet.create({
    goBackButton: {
        marginTop: 6,
        marginLeft: 8,
        marginBottom: 2,
        paddingVertical: 8,
        width: 100
    },
    goBackText: {
        fontSize: 18,
        color: '#5b96f7'
    },
    infoText: {
        marginVertical: 3,
        fontSize: 18
    },
    lessonBox: {
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
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    lessonTextMargin: {
        fontSize: 18,
        color: '#000000',
        marginVertical: 14
    },
    lessonText: {
        fontSize: 18,
        color: '#000000'
    },
    trialTextContainer: {
        marginTop: 6,
        width: 135,
        borderColor: '#e96a43',
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
        color: '#e96a43'
    }
});

export default courseLessonsStyles;

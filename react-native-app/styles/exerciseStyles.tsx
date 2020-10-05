// React, React Native
import { StyleSheet } from 'react-native';

const exerciseStyles = StyleSheet.create({
    questionBox: {
        marginVertical: 10,
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 16,
        borderTopRightRadius: 16,
        borderBottomRightRadius: 8,
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
    questionContainer: {
        marginBottom: 6
    },
    questionText: {
        fontSize: 20
    },
    answerBox: {
        marginVertical: 0
    },
    selectedBox: {
        backgroundColor: '#5b96f7',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8
    },
    nonSelectedBox: {
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    answerText: {
        fontSize: 18,
        color: '#5b96f7'
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24
    },
    title: {
        fontSize: 20
    },
    submitButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        marginTop: 32
    },
    submitButton: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: '#e96a43',
    },
    submitButtonText: {
        fontSize: 20,
        color: '#ffffff'
    }
});

export default exerciseStyles;

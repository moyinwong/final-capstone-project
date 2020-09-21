import { StyleSheet } from 'react-native';

const subjectStyles = StyleSheet.create({
    flatList: {
        flex: 1
    },
    subjectBox: {
        position: 'relative',
        height: 100,
        marginVertical: 10,
        borderRadius: 20
    },
    subjectPic: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderRadius: 20,
        resizeMode: 'cover'
    },
    subjectTitle: {
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 20,
        textAlignVertical: 'center',
        fontSize: 30
    }
})

export default subjectStyles;
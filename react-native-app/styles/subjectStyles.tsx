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
        borderRadius: 1
    },
    linearGradient: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        borderRadius: 12
    },
    subjectPic: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderRadius: 12,
        resizeMode: 'cover'
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
})

export default subjectStyles;

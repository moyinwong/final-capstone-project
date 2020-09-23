// React, React Native
import { StyleSheet } from 'react-native';

const tutorStyles = StyleSheet.create({
    flatList: {
        flex: 1
    },
    tutorBox: {
        flex: 1,
        height: 230,
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 12,
        backgroundColor: '#ffffff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4
    },
    tutorPicContainer: {
        height: 180,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12
    },
    tutorPic: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        resizeMode: 'cover'
    },
    tutorInfoContainer: {
        flex: 1,
        paddingVertical: 2,
        paddingHorizontal: 10
    },
    tutorName: {
        textAlignVertical: 'center',
        fontSize: 25,
        color: '#000000'
    }
})

export default tutorStyles;

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
        backgroundColor: '#ffffff'
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

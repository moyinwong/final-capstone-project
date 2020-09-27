// React, React Native
import { StyleSheet } from 'react-native';

const tutorsStyles = StyleSheet.create({
    flatList: {
        flex: 1
    },
    tutorBox: {
        flex: 1,
        height: 250,
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 12,
        overflow: 'hidden',
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
        borderBottomRightRadius: 16,
        overflow: 'hidden'
    },
    tutorPic: {
        width: '100%',
        height: '100%'
    },
    tutorInfoContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tutorName: {
        fontSize: 23,
        color: '#000000'
    },
    tutorInfo: {
        fontSize: 18,
        color: '#e96a43'
    }
});

export default tutorsStyles;

// React, React Native
import { StyleSheet } from 'react-native';

const tutorStyles = StyleSheet.create({
    tutorBox: {
        height: 250,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
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
        height: 100,
        width: 100,
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
        color: '#555555'
    },
    tutorNumSubscribed: {
        fontSize: 18,
        color: '#e96a43'
    }
});

export default tutorStyles;

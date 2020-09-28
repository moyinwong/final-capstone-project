// React, React Native
import { StyleSheet } from 'react-native';

const coursesListStyles = StyleSheet.create({
    courseBox: {
        marginVertical: 8,
        marginHorizontal: 2,
        borderRadius: 12,
        overflow: 'hidden',
        paddingBottom: 10,
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
    coursePicContainer: {
        height: 180,
        borderBottomLeftRadius: 17,
        overflow: 'hidden'
    },
    coursePic: {
        width: '100%',
        height: '100%'
    },
    courseInfoContainer: {
        paddingVertical: 3,
        paddingHorizontal: 9
    },
    courseTitle: {
        textAlignVertical: 'center',
        fontSize: 21,
        color: '#000000'
    },
    courseScoreContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    courseInfoText: {
        fontSize: 17,
        color: '#555555'
    },
    tutorBox: {
        marginVertical: 8,
        marginHorizontal: 2,
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
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
    tutorPicContainer: {
        height: 50,
        width: 50,
        borderRadius: 100,
        marginRight: 12
    },
    tutorPic: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderRadius: 100,
        resizeMode: 'cover'
    },
    tutorName: {
        fontSize: 18,
        color: '#000000'
    },
    tutorSubscribedBox: {
        display: 'flex',
        flexDirection: 'row'
    },
    tutorNumOfSubscribedText: {
        fontSize: 18,
        color: '#e96a43'
    },
    tutorSubscribedText: {
        fontSize: 18,
        color: '#22c736'
    },
    tutorSubscribeButton: {
        marginLeft: 24,
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 10,
        backgroundColor: '#e96a43'
    },
    tutorSubscribeButtonText: {
        fontSize: 19,
        color: '#ffffff'
    }
});

export default coursesListStyles;

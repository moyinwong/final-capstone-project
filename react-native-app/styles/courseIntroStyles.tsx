// React, React Native
import { StyleSheet } from 'react-native';

const courseIntroStyles = StyleSheet.create({
    courseBox: {
        marginBottom: 8,
        marginHorizontal: 0,
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
    coursePrice: {
        fontSize: 21,
        color: '#e96a43'
    },
    courseButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        marginTop: 8
    },
    courseButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        width: 135,
        borderRadius: 10,
        backgroundColor: '#22c736',
    },
    courseAddedButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        width: 135,
        borderRadius: 10
    },
    courseAddedButtonText: {
        fontSize: 19,
        color: '#22c736'
    },
    courseBuyButton: {
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 10,
        backgroundColor: '#e96a43'
    },
    courseButtonText: {
        fontSize: 19,
        color: '#ffffff'
    },
    purchasedBox: {
        display: 'flex',
        flexDirection: 'row',
    },
    purchasedBoxText: {
        fontSize: 19,
        color: '#22c736'
    },
    courseIntroContainer: {
        marginTop: 8,
        marginBottom: 12,
        marginHorizontal: 2,
        borderRadius: 12,
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
    tutorBox: {
        marginTop: 8,
        marginBottom: 12,
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
    tutorCheckButton: {
        marginLeft: 24,
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        borderColor: '#e96a43',
        borderWidth: 1
    },
    tutorCheckButtonText: {
        fontSize: 19,
        color: '#e96a43'
    }
});

export default courseIntroStyles;

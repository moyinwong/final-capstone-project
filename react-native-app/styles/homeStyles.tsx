// React, React Native
import { StyleSheet } from 'react-native';

const homeStyles = StyleSheet.create({
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 20,
        marginBottom: 2
    },
    screenTitle: {
        fontWeight: 'bold',
        fontSize: 20
    },
    flatList: {
        paddingLeft: 10
    },
    subjectBox: {
        position: 'relative',
        height: 120,
        width: 180,
        marginTop: 6,
        marginBottom: 12,
        marginHorizontal: 6,
        borderTopLeftRadius: 24,
        borderBottomLeftRadius: 12,
        borderTopRightRadius: 12,
        borderBottomRightRadius: 24,
        overflow: 'hidden',
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
    linearGradient: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1
    },
    subjectPic: {
        width: '100%',
        height: '100%'
    },
    subjectTitle: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 8,
        textAlignVertical: 'center',
        fontSize: 30,
        zIndex: 2,
        color: '#ffffff'
    },
    courseBox: {
        height: 290,
        width: 200,
        marginTop: 6,
        marginBottom: 12,
        marginHorizontal: 6,
        borderRadius: 12,
        overflow: 'hidden',
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
        height: 120,
        width: 200,
        borderBottomRightRadius: 17,
        overflow: 'hidden'
    },
    coursePic: {
        width: '100%',
        height: '100%'
    },
    courseInfoContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingVertical: 3,
        paddingHorizontal: 9
    },
    courseTitle: {
        textAlignVertical: 'center',
        fontSize: 21,
        color: '#000000'
    },
    courseSubInfoContainer: {
        flex: 1
    },
    courseInfoText: {
        fontSize: 17,
        color: '#555555'
    },
    coursePrice: {
        fontSize: 17,
        color: '#e96a43',
        marginTop: 5
    },
    courseScoreContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    tutorBox: {
        height: 250,
        width: 180,
        marginTop: 6,
        marginBottom: 12,
        marginHorizontal: 6,
        borderRadius: 12,
        overflow: 'hidden',
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
        height: 180,
        width: 180,
        borderBottomRightRadius: 17,
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
        alignItems: 'flex-start',
        paddingLeft: 9
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

export default homeStyles;

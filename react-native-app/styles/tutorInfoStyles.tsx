// React, React Native
import { StyleSheet } from 'react-native';

const tutorInfoStyles = StyleSheet.create({
    tutorBox: {
        marginHorizontal: 16,
        marginBottom: 12,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 20,
        paddingHorizontal: 12,
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
        height: 150,
        width: 150,
        borderRadius: 150,
        overflow: 'hidden'
    },
    tutorPic: {
        width: '100%',
        height: '100%'
    },
    tutorInfoContainer: {
        marginTop: 3,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    tutorName: {
        fontSize: 23,
        color: '#000000'
    },
    tutorTitleAndTeamContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 12
    },
    tutorInfo: {
        fontSize: 18,
        color: '#555555',
        textAlign: 'center'
    },
    tutorSubscribeContainer: {
        marginTop: 12,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    tutorNumSubscribed: {
        fontSize: 19,
        color: '#e96a43'
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 2,
        marginBottom: 4,
        marginLeft: 20
    },
    screenTitle: {
        fontWeight: 'bold',
        fontSize: 20
    },
    allCoursesButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 13,
        paddingHorizontal: 12
    },
    allCoursesButton: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        borderRadius: 10,
        backgroundColor: '#5b96f7'
    },
    allCoursesButtonText: {
        fontSize: 20,
        color: '#ffffff'
    },
    flatList: {
        paddingLeft: 10
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
    coursePriceContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        marginBottom: 6
    },
    coursePrice: {
        fontSize: 17,
        color: '#e96a43'
    },
    courseScoreContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    }
});

export default tutorInfoStyles;

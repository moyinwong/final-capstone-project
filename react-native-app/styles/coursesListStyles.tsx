// React, React Native
import { StyleSheet } from 'react-native';

const coursesListStyles = StyleSheet.create({
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 3
    },
    screenTitle: {
        fontWeight: 'bold',
        fontSize: 20
    },
    paramTitle: {
        color: '#5b96f7'
    },
    flatList: {
        flex: 1,
        paddingTop: 2
    },
    courseBox: {
        flex: 1,
        marginVertical: 8,
        marginHorizontal: 2,
        borderRadius: 12,
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
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12
    },
    coursePic: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        resizeMode: 'cover'
    },
    courseInfoContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingVertical: 3,
        paddingHorizontal: 9
    },
    courseInfoLeftContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: 10,
        paddingRight: 8
    },
    tutorPicContainer: {
        height: 45,
        width: 45,
        borderRadius: 100
    },
    tutorPic: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderRadius: 100,
        resizeMode: 'cover'
    },
    courseInfoRightContainer: {
        flex: 1
    },
    courseTitle: {
        textAlignVertical: 'center',
        fontSize: 21,
        color: '#000000'
    },
    courseSubInfoContainer: {
        flex: 1
    },
    courseSubInfoTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    courseInfoText: {
        fontSize: 17,
        color: '#555555'
    },
    courseInfoDot: {
        alignSelf: 'center'
    },
    courseSubInfoLowerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingRight: 16
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
    },
});

export default coursesListStyles;

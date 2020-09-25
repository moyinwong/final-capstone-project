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
        height: 230,
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tutorName: {
        fontSize: 23,
        color: '#000000'
    }
});

export default homeStyles;

// React, React Native
import { StyleSheet } from 'react-native';

const myCoursesStyles = StyleSheet.create({
    flatList: {
        flex: 1,
        paddingTop: 8,
        paddingBottom: 20
    },
    courseBox: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginVertical: 8,
        marginHorizontal: 2,
        borderRadius: 12,
        paddingRight: 10,
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
        width: 180,
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 16
    },
    coursePic: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 16,
        resizeMode: 'cover'
    },
    courseInfoContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingVertical: 7,
        paddingLeft: 9
    },
    courseTitle: {
        textAlignVertical: 'center',
        fontSize: 20,
        color: '#000000'
    },
    courseSubInfoContainer: {
        flex: 1
    },
    courseSubInfoTextContainer: {
        display: 'flex',
        flexDirection: 'column',
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
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingRight: 16
    },
    courseButton: {
        backgroundColor: '#ff832d',
        paddingVertical: 6,
        paddingHorizontal: 16,
        marginTop: 5,
        marginRight: 18,
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 6,
        borderTopRightRadius: 6,
        borderBottomRightRadius: 12
    },
    courseButtonText: {
        fontSize: 18,
        color: '#ffffff'
    }
});

export default myCoursesStyles;

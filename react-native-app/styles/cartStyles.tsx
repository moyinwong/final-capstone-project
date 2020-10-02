// React, React Native
import { StyleSheet } from 'react-native';

const cartStyles = StyleSheet.create({
    flatList: {
        flex: 1,
        paddingTop: 8,
        paddingBottom: 20,
        paddingHorizontal: 10
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
        overflow: 'hidden',
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
        borderBottomRightRadius: 16,
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
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    coursePrice: {
        fontSize: 20,
        color: '#e96a43'
    },
    deleteButton: {
        paddingLeft: 8
    },
    paymentContainer: {
        backgroundColor: "#a5aebf"
    },
    totalPriceContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 6,
        paddingBottom: 3,
        paddingHorizontal: 12
    },
    totalPrice: {
        fontSize: 20,
        color: '#ffffff'
    },
    payButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingVertical: 8,
        marginTop: 6,
        marginBottom: 12,
        marginHorizontal: 40,
        borderRadius: 12
    },
    payText: {
        fontSize: 20,
        color: '#333333'
    }
});

export default cartStyles;

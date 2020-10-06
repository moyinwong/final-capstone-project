// React, React Native
import { StyleSheet } from 'react-native';

const homeStyles = StyleSheet.create({
    linearGradient: {
        height: 285,
        width: '100%',
        position: 'absolute',
        top: -100,
        zIndex: -1,
        borderBottomRightRadius: 20
    },
    welcomeText: {
        marginTop: 12,
        marginLeft: 16,
        marginBottom: 12,
        fontSize: 24
    },
    searchBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    searchText: {
        flex: 1,
        marginLeft: 16,
        marginRight: 6,
        marginBottom: 8,
        paddingVertical: 8,
        paddingLeft: 10,
        borderRadius: 10,
        fontSize: 21,
        backgroundColor: 'rgba(255, 255, 255, 0.9)'
    },
    searchButton: {
        padding: 10,
        marginRight: 6
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 8,
        marginBottom: 2
    },
    titleButton: {
        marginRight: 10,
        paddingVertical: 6,
        paddingHorizontal: 10
    },
    screenTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#000000'
    },
    nonActiveScreenTitle: {
        fontSize: 20,
        color: '#828282'
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

export default homeStyles;

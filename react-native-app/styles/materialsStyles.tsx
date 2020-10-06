// React, React Native
import { StyleSheet } from 'react-native';

const materialsStyles = StyleSheet.create({
    goBackButton: {
        marginTop: 8,
        marginLeft: 8,
        paddingVertical: 8,
        width: 100
    },
    goBackText: {
        fontSize: 18,
        color: '#5b96f7'
    },
    filesContainer: {
        marginTop: 4,
        marginHorizontal: 2,
        borderRadius: 12,
        overflow: 'hidden',
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 12
    },
    title: {
        fontSize: 20
    },
    separator: {
        marginVertical: 6,
        width: '100%',
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
    },
    fileBox: {
        marginVertical: 3,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    fileText: {
        marginVertical: 3,
        fontSize: 18,
        color: '#5b96f7'
    },
});

export default materialsStyles;

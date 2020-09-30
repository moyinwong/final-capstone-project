// React, React Native
import { StyleSheet } from 'react-native';

const homeCategoriesStyles = StyleSheet.create({
    container: {
        marginTop: 6,
        marginBottom: 12
    },
    subContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 4
    },
    box: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 120,
        marginTop: 6,
        marginBottom: 12,
        marginHorizontal: 12,
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 16,
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    text: {
        fontSize: 26,
        color: '#000000'
    }
});

export default homeCategoriesStyles;

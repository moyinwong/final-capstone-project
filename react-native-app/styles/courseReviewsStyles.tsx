// React, React Native
import { StyleSheet } from 'react-native';

const courseReviewsStyles = StyleSheet.create({
    infoBox: {
        marginTop: 3,
        marginBottom: 12,
        marginHorizontal: 2,
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'column',
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
    infoText: {
        marginVertical: 3,
        fontSize: 18
    },
    commentBox: {
        marginVertical: 3
    },
    infoComment: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    infoCommentUser: {
        fontSize: 16,
        color: '#666666'
    },
    separator: {
        marginVertical: 10,
        width: '100%',
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1
    }
});

export default courseReviewsStyles;

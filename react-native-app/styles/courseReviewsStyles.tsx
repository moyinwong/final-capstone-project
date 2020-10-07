// React, React Native
import { StyleSheet } from 'react-native';

const courseReviewsStyles = StyleSheet.create({
    goBackButton: {
        marginTop: 6,
        marginLeft: 8,
        marginBottom: 2,
        paddingVertical: 8,
        width: 100
    },
    goBackText: {
        fontSize: 18,
        color: '#5b96f7'
    },
    flatListContainer: {
        paddingHorizontal: 10
    },
    infoText: {
        marginVertical: 3,
        fontSize: 18
    },
    commentBox: {
        marginTop: 3,
        marginBottom: 12,
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'column',
        paddingVertical: 4,
        paddingHorizontal: 12,
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
        marginVertical: 8,
        marginHorizontal: 10,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1
    }
});

export default courseReviewsStyles;

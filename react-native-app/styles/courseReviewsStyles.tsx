// React, React Native
import { StyleSheet } from 'react-native';

const courseReviewsStyles = StyleSheet.create({
    modal: {
        height: '100%',
        width: '100%'
    },
    modalTransBackground: {
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalBox: {
        backgroundColor: '#ffffff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
        overflow: 'hidden'
    },
    modalTitleText: {
        fontSize: 24
    },
    ratingText: {
        fontSize: 20,
        marginRight: 6
    },
    starsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 12
    },
    starHolder: {
        marginRight: 2
    },
    textInput: {
        height: 180,
        width: 320,
        marginTop: 12,
        marginBottom: 6,
        borderWidth: 1,
        borderRadius: 12,
        borderColor: '#c0c0c0',
        overflow: 'hidden',
        paddingVertical: 8,
        paddingHorizontal: 12,
        fontSize: 18,
        textAlignVertical: 'top'
    },
    submitButtonContainer: {
        marginTop: 18,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
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
    reviewButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    reviewButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        width: 164,
        borderRadius: 10,
        backgroundColor: '#e96a43',
        marginBottom: 6
    },
    reviewText: {
        fontSize: 19,
        color: '#ffffff'
    },
    reviewNotAllowedButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        width: 164,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e96a43',
        marginBottom: 6
    },
    reviewNotAllotedText: {
        fontSize: 19,
        color: '#e96a43'
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

// React, React Native
import { Alert } from 'react-native';

// Components
import showCommentBox from './showCommentBox';
import showRateBox from './showRateBox';


export default function showCommentOrRateBox() {
    Alert.alert(
        "評價",
        "請評價",
        [
            { text: "評價", onPress: () => console.log("評價") }
        ],
        { cancelable: true }
    )
    showCommentBox();
    showRateBox()
};

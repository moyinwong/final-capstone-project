// React, React Native
import { Alert } from 'react-native';

export default function showSubscribeBox() {
    Alert.alert(
        "訂閱",
        "請訂閱",
        [
            { text: "訂閱", onPress: () => console.log("訂閱") }
        ],
        { cancelable: true }
    )
};

// React, React Native
import { Alert } from 'react-native';

export default function showPurchaseBox() {
    Alert.alert(
        "購買",
        "請購買",
        [
            { text: "購買", onPress: () => console.log("購買") }
        ],
        { cancelable: true }
    )
};

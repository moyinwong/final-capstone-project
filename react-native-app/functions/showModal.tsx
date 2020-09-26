// React, React Native
import { Alert } from 'react-native';

// Components
import showCommentOrRateBox from './showCommentOrRateBox';
import showPurchaseBox from './showPurchaseBox';


export default function showModal(isPurchased: boolean) {
    if (isPurchased) {
        showCommentOrRateBox();
    } else {
        showPurchaseBox();
    }
};

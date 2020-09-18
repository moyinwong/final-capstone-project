import { HeaderStyleInterpolators, CardStyleInterpolators } from '@react-navigation/stack';

const stackTransition = {
    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
    cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid
}

export default stackTransition;
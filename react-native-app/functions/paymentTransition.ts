import { HeaderStyleInterpolators, CardStyleInterpolators } from '@react-navigation/stack';

const stackTransition = {
    headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
    cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS
}

export default stackTransition;
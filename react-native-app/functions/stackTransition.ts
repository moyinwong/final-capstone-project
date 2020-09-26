import { HeaderStyleInterpolators, CardStyleInterpolators } from '@react-navigation/stack';

const stackTransition = {
    headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
}

export default stackTransition;
// React, React Native
import React, { useState } from 'react';
import { View } from 'react-native';

// Icons
import { FontAwesome } from '@expo/vector-icons';

// Styles
import starsStyles from '../styles/starsStyle';

export default function Stars(props: { score: number; }) {

    let score = props.score;

    const [firstStar, setFirstStar] = useState(score > 1 ? '100%' : (score * 100) + '%');
    const [secondStar, setSecondStar] = useState(score < 1 ? '0%' : (score > 2 ? '100%' : ((score - 1) * 100) + '%'));
    const [thirdStar, setThirdStar] = useState(score < 2 ? '0%' : (score > 3 ? '100%' : ((score - 2) * 100) + '%'));
    const [forthStar, setForthStar] = useState(score < 3 ? '0%' : (score > 4 ? '100%' : ((score - 3) * 100) + '%'));
    const [fifthStar, setFifthStar] = useState(score < 4 ? '0%' : ((score - 4) * 100) + '%');

    return (
        <View style={starsStyles.starsContainer}>
            <View>
                <FontAwesome style={{ ...starsStyles.star, width: firstStar }} name="star" size={20} color="#fadd4d" />
                <FontAwesome style={starsStyles.starEmpty} name="star-o" size={20} color="#fadd4d" />
            </View>
            <View>
                <FontAwesome style={{ ...starsStyles.star, width: secondStar }} name="star" size={20} color="#fadd4d" />
                <FontAwesome style={starsStyles.starEmpty} name="star-o" size={20} color="#fadd4d" />
            </View>
            <View>
                <FontAwesome style={{ ...starsStyles.star, width: thirdStar }} name="star" size={20} color="#fadd4d" />
                <FontAwesome style={starsStyles.starEmpty} name="star-o" size={20} color="#fadd4d" />
            </View>
            <View>
                <FontAwesome style={{ ...starsStyles.star, width: forthStar }} name="star" size={20} color="#fadd4d" />
                <FontAwesome style={starsStyles.starEmpty} name="star-o" size={20} color="#fadd4d" />
            </View>
            <View>
                <FontAwesome style={{ ...starsStyles.star, width: fifthStar }} name="star" size={20} color="#fadd4d" />
                <FontAwesome style={starsStyles.starEmpty} name="star-o" size={20} color="#fadd4d" />
            </View>
        </View>
    )
}

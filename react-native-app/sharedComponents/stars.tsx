// React, React Native
import React, { useState } from 'react';
import { View } from 'react-native';

// Icons
import { FontAwesome } from '@expo/vector-icons';

// Styles
import starsStyles from '../styles/starsStyle';

export default function Stars(props: { score: number; }) {

    let score = props.score;

    const [starsWidth, setStarsWidth] = useState(
        [
            { id: '1', width: score > 1 ? '100%' : (score * 100) + '%' },
            { id: '2', width: score < 1 ? '0%' : (score > 2 ? '100%' : ((score - 1) * 100) + '%') },
            { id: '3', width: score < 2 ? '0%' : (score > 3 ? '100%' : ((score - 2) * 100) + '%') },
            { id: '4', width: score < 3 ? '0%' : (score > 4 ? '100%' : ((score - 3) * 100) + '%') },
            { id: '5', width: score < 4 ? '0%' : ((score - 4) * 100) + '%' }
        ]
    );

    return (
        <View style={starsStyles.starsContainer}>

            {starsWidth.map((item) => {
                return (
                    <View>
                        <FontAwesome style={{ ...starsStyles.star, width: item.width }} name="star" size={20} color="#fadd4d" />
                        <FontAwesome style={starsStyles.starEmpty} name="star" size={20} color="#cfd9ea" />
                    </View>
                )
            })}

        </View>
    )
}

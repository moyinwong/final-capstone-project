// React, React Native
import React, { useContext } from 'react';
import { View, Text } from 'react-native';

// Context
import { CartContext } from "../contexts/cartContext";

// Icons
import { AntDesign } from '@expo/vector-icons';

// Styles
import cartIconStyles from '../styles/cartIconStyle';

export default function CartIcon(props: { color: string }) {
    // Context
    const { cartNum } = useContext(CartContext);

    return (
        <View>
            <AntDesign name="shoppingcart" color={props.color} size={24} />
            {cartNum !== 0 && (
                <View style={cartIconStyles.numberContainer}>
                    <Text style={cartIconStyles.number}>{cartNum}</Text>
                </View>
            )}
        </View>
    )
}

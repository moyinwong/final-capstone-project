// React, React Native
import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';

// Interface
import ICourse from '../Interfaces/ICourse';

export const CartContext = createContext();

const CartContextProvider = (props: any) => {

    // Null variable
    const list: ICourse[] = [];

    const [cartList, setCartList] = useState(list);
    const [cartSum, setCartSum] = useState(0);

    const addCartList = (course: ICourse) => {
        // Check
        if (checkDuplicate(course)) {
            Alert.alert(
                "重複加入",
                "此課程已在購物車",
                [
                    {
                        text: "取消",
                        onPress: () => console.log("取消"),
                        style: "cancel"
                    }
                ],
                { cancelable: true }
            )
        } else {
            let tempSum = 0;
            for (let item of cartList) {
                tempSum += (parseInt(item.price));
            }
            tempSum += (parseInt(course.price));

            setCartList([...cartList, course]);

            setCartSum(tempSum);
        }
    };
    const removeCartList = (course: ICourse) => {
        let tempSum = 0;
        for (let item of cartList) {
            tempSum += (parseInt(item.price));
        }
        tempSum -= (parseInt(course.price));

        setCartList(cartList.filter(item => item.id! !== course.id));

        setCartSum(tempSum);
    };
    const checkDuplicate = (course: ICourse) => {
        for (let item of cartList) {
            if (course.id == item.id) {
                return true
            }
        }
        return false
    }

    return (
        <CartContext.Provider value={{ cartList, cartSum, addCartList, removeCartList, checkDuplicate, setCartList, setCartSum }}>
            { props.children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;

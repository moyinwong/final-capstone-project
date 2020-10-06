// React, React Native
import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';

// Interface
import ICourse from '../Interfaces/ICourse';

// Data
import AsyncStorage from '@react-native-community/async-storage';

export const CartContext = createContext();

const CartContextProvider = (props: any) => {

    // Null variable
    const list: ICourse[] = [];

    const [cartList, setCartList] = useState(list);
    const [cartSum, setCartSum] = useState(0);
    const [cartNum, setCartNum] = useState(0);

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
            let tempArray = [...cartList, course];
            let tempSum = 0;

            for (let item of tempArray) {
                tempSum += (parseInt(item.price));
            }

            storeCartList(tempArray);
            storeCartSum(tempSum);

            setCartList(tempArray);
            setCartSum(tempSum);
            setCartNum(tempArray.length);
        }
    };
    const removeCartList = (course: ICourse) => {
        let tempArray = cartList.filter(item => item.id! !== course.id);
        let tempSum = 0;

        for (let item of tempArray) {
            tempSum += (parseInt(item.price));
        }

        storeCartList(tempArray);
        storeCartSum(tempSum);

        setCartList(tempArray);
        setCartSum(tempSum);
        setCartNum(tempArray.length);
    };
    const checkDuplicate = (course: ICourse) => {
        for (let item of cartList) {
            if (course.id == item.id) {
                return true
            }
        }
        return false
    }

    // Async Storage
    const storeCartList = async (courseList: ICourse[]) => {
        try {
            const cartListJSON = JSON.stringify(courseList)
            await AsyncStorage.setItem('cartListKey', cartListJSON)
        } catch (err) {
            console.log(err);
        }
    }
    const storeCartSum = async (courseSum: number) => {
        try {
            const cartSumString = courseSum.toString();
            await AsyncStorage.setItem('cartSumKey', cartSumString)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <CartContext.Provider value={{
            cartList, cartSum, addCartList, removeCartList,
            checkDuplicate, setCartList, setCartSum,
            cartNum, setCartNum,
            storeCartList, storeCartSum
        }}>
            { props.children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;

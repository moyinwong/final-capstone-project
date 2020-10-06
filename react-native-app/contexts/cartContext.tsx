// React, React Native
import React, { createContext, useState } from 'react';

// Interface
import ICourse from '../Interfaces/ICourse';

export const CartContext = createContext();

const CartContextProvider = (props: any) => {

    // Null variable
    const list: ICourse[] = [];

    const [cartList, setCartList] = useState(list);
    const [cartSum, setCartSum] = useState(0);

    const addCartList = (course: ICourse) => {
        let tempSum = 0;
        for (let item of cartList) {
            tempSum += (parseInt(item.price));
        }
        tempSum += (parseInt(course.price));

        setCartList([...cartList, course]);

        setCartSum(tempSum);
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

    return (
        <CartContext.Provider value={{ cartList, cartSum, addCartList, removeCartList, setCartList, setCartSum }}>
            { props.children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;

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
        setCartList([...cartList, course]);

        let tempSum = 0;
        for (let item of cartList) {
            tempSum += (parseInt(item.price));
        }
        setCartSum(tempSum);
    };
    const removeCartList = (course: ICourse) => {
        setCartList(cartList.filter(item => item.id! !== course.id));

        let tempSum = 0;
        for (let item of cartList) {
            tempSum += (parseInt(item.price));
        }
        setCartSum(tempSum);
    };

    return (
        <CartContext.Provider value={{ cartList, cartSum, addCartList, removeCartList, setCartList, setCartSum }}>
            { props.children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;

import React, {createContext, useState, useEffect} from 'react';


export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cartItems, setCart] = useState([]);
    const [numRender, setNum] = useState(0);
    const [prices, setPrices] = useState([]);
    // handle count from one product
    const handleCount = (productId, type) => {
        cartItems.forEach((product) => {
            if (product.id === productId) {
                type === 'plus' ? product.count++ : product.count > 1 && type === 'minus' ? product.count-- : product.count;
                setNum(product.count)
            }
        })
    }
    // handle remove item
    const removeProduct = (id) => {
        const newArr = cartItems.filter((item) => item.id != id);
        setCart(newArr)
    }

    useEffect(() => {
        // rerender when cart update
        const allPrices = [];
        cartItems.forEach((product) => {
            console.log(product.count)
            console.log(product.price)
            let productVal = product.count * product.price;
            allPrices.push(productVal)
        })
        const totalPrice = allPrices.reduce((total, num) => {
            return total + num;
        }, 0)
        setPrices(totalPrice);
    }, [cartItems, numRender])
    return(
        <CartContext.Provider value={{cartItems, setCart, handleCount, removeProduct, prices}}>
            {children}
        </CartContext.Provider>
    )
}
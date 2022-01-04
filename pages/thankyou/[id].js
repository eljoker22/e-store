import React, {useContext, useEffect} from 'react'
import {CartContext} from '../../component/context/CartContext'
import {useRouter} from 'next/router'
export default function ThankYou() {
    const {query: {id}} = useRouter();
    const {clearCart} = useContext(CartContext);
    useEffect(() => {
        clearCart();
    }, [])
    return(
        <>
            <h1>Thank you order has successfully</h1>
            <h3>your order id: {id ? id : ''}</h3>
        </>
    )
}
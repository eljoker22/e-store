import React, {useContext, useState, useEffect} from 'react'
import {CartContext} from '../component/context/CartContext'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import classes from '../styles/cart.module.css';
import Image from 'next/image';
import useMediaQuery from '@mui/material/useMediaQuery'
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(
    `${process.env.STRIPE_PUBLISHBLE_KEY}`
);

function Cart() {

    const {cartItems, handleCount, removeProduct, prices} = useContext(CartContext);
    const mediaQuery = useMediaQuery('(max-width: 768px)');


    return(
        <>
        <h1>Shoping Cart</h1>
        {cartItems.length > 0 &&
        <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
                <div className={classes.cartItems}>
                    {cartItems.map((product, index) => {
                        
                    return <Paper key={index} elevation={3} style={{marginBottom: '15px'}}>
                            <div className={classes.cartItem}>
                                {!mediaQuery &&
                                <IconButton aria-label="delete" style={{color: '#fff'}} onClick={() => removeProduct(product.id)}>
                                    <DeleteIcon />
                                </IconButton>
                                }
                                <Image src={product.image} alt={product.title} width={150} height={200} objectFit="contain" />
                                
                                <Typography variant="h6" style={{maxWidth: !mediaQuery ? '250px' : '100%', marginBottom: mediaQuery && '15px', marginTop: mediaQuery && '15px'}}>
                                    {product.title}
                                </Typography>
                                <Typography>
                                    <Button 
                                        variant="contained" 
                                        disableElevation 
                                        style={{minWidth: '0', padding: '7px', marginRight: '10px'}}
                                        onClick={() => handleCount(product.id, 'plus')}>
                                        <AddIcon />
                                    </Button>
                                        <span style={{fontSize: '18px', fontWeight: 'bold'}}>
                                        {product.count}
                                        </span>
                                    <Button 
                                        variant="contained" 
                                        disableElevation 
                                        style={{minWidth: '0', padding: '7px', marginLeft: '10px'}} 
                                        onClick={() => handleCount(product.id, 'minus')}>
                                        <RemoveIcon />
                                    </Button>
                                </Typography>
                                <Typography variant="h6" paragraph={mediaQuery ? false : true} style={{marginTop: mediaQuery && '15px'}}>
                                    <strong>{(product.price * product.count)}$</strong>
                                </Typography>
                            </div>
                            </Paper>    
                    })}
                </div>
            </Grid>
            <Grid item xs={12} md={4}>
                <Paper elevation={3} style={{padding: '15px'}}>
                    <Typography variant="h6" paragraph={true} style={{borderBottom: '1px solid #ccc', paddingBottom: '15px'}}>
                        Cart Summary
                    </Typography>
                    <Typography paragraph={true}>
                        <input className={classes.promoCode} type="text" name="promo-code" placeholder="insert promo code here" />
                    </Typography>
                    <Typography variant="body1" paragraph={true} className={classes.detailPrice}>
                        <strong>Subtotal</strong>
                        <strong>{prices.toFixed(2)}$</strong>
                    </Typography>
                    <Typography variant="body1" paragraph={true} className={classes.detailPrice} style={{borderBottom: '1px solid #ccc', paddingBottom: '15px'}}>
                        <strong>Shiping</strong>
                        <strong>10$</strong>
                    </Typography>
                    <Typography variant="body1" paragraph={true} className={classes.detailPrice}>
                        <strong>Total</strong>
                        <strong>{`${(prices + 10).toFixed(2)}$`}</strong>
                    </Typography>
                        <form action="/api/create-stripe-session" method="POST"> 
                            <Button 
                            type="submit"
                            variant="contained" 
                            fullWidth={true}>
                            <strong>Make Order</strong>
                            </Button>
                        </form>
                </Paper>
            </Grid>
        </Grid>}
        {cartItems.length === 0 &&
        <Paper elevation={3} style={{padding: '15px', textAlign: 'center'}}>
            <Typography variant="h3">
                cart is empty.
            </Typography>
        </Paper>
        }
        </>
    )
}

export default Cart;
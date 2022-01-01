import React, { useContext, useState } from 'react'
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating'
import Button from '@mui/material/Button';
import Image from 'next/image';
import {CartContext} from '../../component/context/CartContext'
import classes from '../../styles/product.module.css';
import CartButton from '../../component/CartButton';
import CircularProgress from '@mui/material/CircularProgress';
import useMediaquery from '@mui/material/useMediaQuery'



export async function getStaticPaths() {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    const paths = data.map((product) => {
        return{
            params: {id: product.id.toString()}
        }
    })
    return{
        paths, 
        fallback: false
    }
}

export async function getStaticProps(contexct) {
    const id = contexct.params.id;
    let res = await fetch(`https://fakestoreapi.com/products/${id}`);
    let data = await res.json();
    return{
        props: {
            product: data,
        }
    }
}

function Product({product}) {
    const {setCart, cartItems} = useContext(CartContext);
    const [loading, setLoading] = useState(false);
    const mediaQuery = useMediaquery('(max-width: 768px)');
    const AddCart = () => {
        const filterArr = cartItems.filter((pro) => pro.id != product.id);
        product.count = 1;
        setCart([...filterArr, product]);
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000)
    }
    console.log(product)
    return(
    <dev className={classes.product}>
        <div className={classes.imgCont} style={{marginBottom: mediaQuery && '30px'}}>
            <Image src={product.image} alt={product.title} layout="fill" objectFit="contain" />
        </div>
        <div className={classes.contentSide}>
            <Typography variant="h4">
                {product.title}
            </Typography>
            <Typography variant="h5" paragraph={true} className={classes.price}>
                {product.price+'$'}
            </Typography>
            <Typography variant="h6" paragraph={true} style={{display: 'flex', alignItems: 'center'}}>
                <Rating value={product.rating.rate} size="large" />
                {` (${product.rating.count})`}
            </Typography>
            <Typography variant="h6" paragraph={true}>
                <strong>category: </strong> {product.category}
            </Typography>
            <Typography variant="h6" paragraph={true}>
                {product.description}
            </Typography>
            <Button variant="contained" fullWidth="true" style={{padding: '10px'}} onClick={AddCart}>
                {loading ? <CircularProgress size={25} style={{color: '#fff'}} /> : 'Add Cart'}
            </Button>
        </div>
        <CartButton />
    </dev>
    )
}

export default Product;
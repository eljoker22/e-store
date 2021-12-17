import React, {useContext} from 'react';
import {CartContext} from './context/CartContext'
import { Button, IconButton } from '@mui/material';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/system';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import classes from '../styles/cart.module.css';
function CartButton() {
    const {prices} = useContext(CartContext);
    const StyleBadge = styled(Badge)`
    & .MuiBadge-badge {
        background: var(--primary);
        color: #fff;
    }
    `;  
    return(
        <div className={classes.fixedBtn}>
        <StyleBadge badgeContent={`${prices}$`}>
            <IconButton className={classes.cartBadge} size="large"> 
                    <LocalMallIcon />
            </IconButton>
        </StyleBadge>
        </div>

    )
}
export default CartButton;
import React, {useContext, useState} from 'react';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import SearchIcon from '@mui/icons-material/Search';
import useMediaQuery from '@mui/material/useMediaQuery'
import Link from 'next/link'
import classes from './header.module.css';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton'
import {CartContext} from '../context/CartContext'
import Divider from '@mui/material/Divider';

function Header() {
    const {cartItems} = useContext(CartContext);
    const mediaQuery = useMediaQuery('(max-width: 768px)');
    const [open, setOpen] = useState(false);
    
    return(
        <AppBar style={{background: 'var(--primary)'}}>
            <Container>
            <Toolbar style={{padding: '0', justifyContent: 'space-between'}}>
                <Typography variant="h6" style={{fontWeight: 'bold', cursor: 'pointer'}}>E-STORE.</Typography>
                {!mediaQuery &&
                <>
                <div className={classes.menuContainer}>
                    <Link href="/">
                        <a><Typography className={classes.menuItem}>Home</Typography></a>
                    </Link>
                    <Link href="/cart">
                        <a><Typography className={classes.menuItem}>Cart</Typography></a>
                    </Link>
                    <Link href="/">
                        <a><Typography className={classes.menuItem}>About</Typography></a>
                    </Link>
                    <Link href="/">
                        <a><Typography className={classes.menuItem}>Contact Us</Typography></a>
                    </Link>
                </div>
                <dev className={classes.inputSearch}>
                    <input type="text" placeholder="Search..." />
                    <dev className={classes.iconCont}>
                        <SearchIcon style={{color: 'var(--primary'}} />
                    </dev>
                </dev>
                </>}
                {mediaQuery && 
                    <IconButton onClick={() => setOpen(true)}>
                        <MenuIcon 
                        style={{color: '#fff', fontSize: '30px'}}
                        />
                    </IconButton>
                }
                </Toolbar>
                {mediaQuery && 
                    <Drawer
                        anchor="right"
                        open={open}
                        onClose={() => setOpen(false)}
                    >
                    <>
                    <dev className={classes.inputSearch}>
                        <input type="text" placeholder="Search..." />
                        <dev className={classes.iconCont}>
                            <SearchIcon style={{color: 'var(--primary'}} />
                        </dev>
                    </dev>
                    <div className={classes.menuContainer}>
                        <Link href="/">
                            <a><Typography className={classes.menuItem}>Home</Typography></a>
                        </Link>
                        <Divider />
                        <Link href="/">
                            <a><Typography className={classes.menuItem}>Login</Typography></a>
                        </Link>
                        <Divider />
                        <Link href="/cart">
                            <a><Typography className={classes.menuItem}>Cart</Typography></a>
                        </Link>
                        <Divider />
                    </div>
                    </>
                    </Drawer>
                }
            </Container>
        </AppBar>

    )
}
export default Header;
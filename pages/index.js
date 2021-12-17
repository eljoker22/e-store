import React, {useState, useEffect} from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import useMediaQuery from '@mui/material/useMediaQuery';
import classes from '../styles/Home.module.css';
import Image from 'next/image'
import Link from 'next/link'
import CartButton from '../component/CartButton'; 

export async function getStaticProps() {
  const res = await fetch('https://fakestoreapi.com/products');
  const data = await res.json();
  const resCat = await fetch('https://fakestoreapi.com/products/categories');
  const catData = await resCat.json();
  return{
    props: {
      products: data,
      categories: catData
    },
  }
}

export default function Home({products, categories}) {
  const mediaQuery = useMediaQuery('(max-width: 768px)');
  const borderStyle = {paddingBottom: '10px', borderBottom: '1px solid #ccc', marginBottom: '10px'}
  const [activeCat, setActiveCat] = useState(['all']);
  const [priceVal, setPriceVal] = useState([0, 1000]);
  const [activeProduct, setActiveProduct] = useState(products);


  const handleCategory = async (category) => {
    if (activeCat.includes(category)) {
      const newArr = []
      activeCat.forEach((cat) => {
        cat != category && newArr.push(cat);
      });
      setActiveCat(newArr);
    }else{
      setActiveCat((prevState) => [...prevState, category]);
    }
  }

  const handlePriceFilter = (e) => {
    setPriceVal(e.target.value);
  }

  useEffect(() => {
    const filterProducts = () => {
      const productsNew = [];
      if (!activeCat.includes('all') && activeCat.length > 0) {
        products.forEach(pro => {
          if (activeCat.includes(pro.category) && pro.price > priceVal[0] && pro.price < priceVal[1]) {
            productsNew.push(pro);
          } 
        });
        setActiveProduct(productsNew);

      }else if (activeCat.length === 0 || activeCat.includes('all')) {
        products.forEach(pro => {
          pro.price > priceVal[0] && pro.price < priceVal[1] && productsNew.push(pro);
        })
        setActiveProduct(productsNew);
      }

    }
    filterProducts();

  }, [activeCat, priceVal])

  return (
    <>
    <h1>shop</h1>
    <div className={classes.homeContainer}>
    <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 12, md: 12}}>
      {mediaQuery && // if mobile
      <Grid item xs={12} md={4}>
      <Paper elevation={3} style={{padding: '15px'}}>
        <Typography variant="h5" style={borderStyle}>
          Filter Products
        </Typography>
        <div style={borderStyle}>
          <Typography variant="h6">Categories</Typography>
          <List>
              <ListItem style={{padding: '0px'}}>
                <ListItemButton style={{padding: '0'}} onClick={() => handleCategory('all')}>
                  <ListItemIcon>
                    <Checkbox 
                      defaultChecked
                      disableRipple
                      inputProps={{"aria-labelledby": 'all'}}
                      checked={activeCat.includes('all')}
                    />
                  </ListItemIcon>
                  <ListItemText id={'all'} primary="all" />
                </ListItemButton>
              </ListItem>
          { categories.map((cat) => {
            return <ListItem style={{padding: '0px'}}>
                    <ListItemButton style={{padding: '0'}} onClick={() => handleCategory(cat)}>
                      <ListItemIcon>
                        <Checkbox 
                          color="primary"
                          disableRipple
                          inputProps={{"aria-labelledby": cat}}
                          checked={activeCat.includes(cat)}
                        />
                      </ListItemIcon>
                      <ListItemText id={cat} primary={cat} />
                    </ListItemButton>
                  </ListItem>
          })}
          </List>
        </div>

        <Typography variant="h6">Price Filter</Typography>
          <div style={{padding: '0 15px'}}>
          <Typography variant="h6" paragraph={true} style={{fontWeight: 'bold'}}>
            {`${priceVal[0]}$ - ${priceVal[1]}$`}
          </Typography>
            <Slider
            style={{color: 'var(--primary)'}}
            onChange={handlePriceFilter}
            defaultValue={[0, 1000]}
            value={priceVal}
            valueLabelDisplay="auto"
            max={1000}
            />
          </div>
      </Paper>
    </Grid>
      }
      <Grid item xs={12} md={8}>
        <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 12, sm: 12, md: 12}}>
          {activeProduct.map((product) => {
            return <Grid key={product.id} item xs={12} sm={6} md={4}>
                    <Paper elevation={3}>
                      <div className={classes.product}>
                        <div style={{position: 'relative', width: '100%', height: '280px'}}>
                          <Image src={product.image} alt={product.title} layout="fill" objectFit="contain" />
                        </div>
                        <div className={classes.productContent}>
                          <Typography variant="h6" noWrap={true}>{product.title}</Typography>
                          <Typography variant="h6"><strong>{product.price}$</strong></Typography>
                          <Typography>
                            <Rating readOnly value={product.rating.rate} size="medium" />
                          </Typography>
                        </div>
                          <Link href={`/product/${product.id}`}>
                            <a><Button className={classes.btnProduct}>View More</Button></a>
                          </Link>
                      </div>
                    </Paper>
                  </Grid>
          })}
        </Grid>
      </Grid>

      {!mediaQuery && // if not mobile
      <Grid item xs={12} md={4}>
      <Paper elevation={3} style={{padding: '15px'}}>
        <Typography variant="h5" style={borderStyle}>
          Filter Products
        </Typography>
        <div style={borderStyle}>
          <Typography variant="h6">Categories</Typography>
          <List>
              <ListItem style={{padding: '0px'}}>
                <ListItemButton style={{padding: '0'}} onClick={() => handleCategory('all')}>
                  <ListItemIcon>
                    <Checkbox 
                      defaultChecked
                      disableRipple
                      inputProps={{"aria-labelledby": 'all'}}
                      checked={activeCat.includes('all')}
                    />
                  </ListItemIcon>
                  <ListItemText id={'all'} primary="all" />
                </ListItemButton>
              </ListItem>
          { categories.map((cat) => {
            return <ListItem style={{padding: '0px'}}>
                    <ListItemButton style={{padding: '0'}} onClick={() => handleCategory(cat)}>
                      <ListItemIcon>
                        <Checkbox 
                          color="primary"
                          disableRipple
                          inputProps={{"aria-labelledby": cat}}
                          checked={activeCat.includes(cat)}
                        />
                      </ListItemIcon>
                      <ListItemText id={cat} primary={cat} />
                    </ListItemButton>
                  </ListItem>
          })}
          </List>
        </div>

        <Typography variant="h6">Price Filter</Typography>
          <div style={{padding: '0 15px'}}>
          <Typography variant="h6" paragraph={true} style={{fontWeight: 'bold'}}>
            {`${priceVal[0]}$ - ${priceVal[1]}$`}
          </Typography>
            <Slider
            style={{color: 'var(--primary)'}}
            onChange={handlePriceFilter}
            defaultValue={[0, 1000]}
            value={priceVal}
            valueLabelDisplay="auto"
            max={1000}
            />
          </div>
      </Paper>
    </Grid>
      }

    </Grid>
    </div>
    <CartButton />
    </>
  )
}

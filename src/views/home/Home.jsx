import { Box, Fab, ImageList, ImageListItem, Stack, ImageListItemBar, IconButton, Typography, Toolbar, Badge, Popover, List, ListItem, ListItemAvatar, ListItemText, Divider, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { deleteProducts, getProducts } from '../../services/productService';
import AddIcon from '@mui/icons-material/Add';
import { FormProduct } from '../../components/form-product/FormProduct';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { PopoverShopping } from '../../components/popover-shopping/PopoverShopping';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
let titleDrawer = 'Registrar Producto';
//const myProducts = [];
export const Home = () => {
  const { token } = useSelector((selector) => selector.auth) || sessionStorage.getItem('access_token');
  const [open, setOpen] = useState(false);
  const [productState, setProductState] = useState({});
  const [isLogged, setIsLogged] = useState(false);
  const [listProducts, setListProducts] = useState([]);
  const [amountProducts, setAmountProducts] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [myProducts, setMyProducts] = useState([]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? 'simple-popover' : undefined;
  const addProduct = (product) => {
    myProducts.push(product);
    setAmountProducts(myProducts.length);
  }

  const removeProduct = (index) =>{
    setMyProducts(
      myProducts.filter(a =>
        a.id !== index
      )
    );
  }

  const style = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  };
  const createProduct = () => {
    titleDrawer = 'Registrar producto';
    setProductState({});
    setOpen(true);
  }
  const confirmDeleteProduct = (productID) => {
    if (window.confirm("Seguro que quieres eliminar el producto ") === true) {
      deleteProducts(token, productID).then((response) => {
        alert('Producto eliminado');
        window.location.reload();
      });
    }
  }
  const editProduct = (productID, productName, inventory, description) => {
    titleDrawer = 'Editar producto'
    setProductState({
      productName: productName,
      id: productID,
      inventory: inventory,
      description: description
    });
    setOpen(true);
  }
  useEffect(() => {
    if (!listProducts.length) {
      getProducts().then((response) => {
        setListProducts(response);
      })
    }
    if (!!token) {
      setIsLogged(true);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, myProducts]);
  const ListImages = ({ data = [] }) => {
    return (
      <ImageList cols={6} >
        {data.map((item) => (
          <ImageListItem key={item.imagePath}>
            <img
              src={`${process.env.REACT_APP_API_URL}/product/images/${item.imagePath}?w=248&fit=crop&auto=format`}
              srcSet={`${process.env.REACT_APP_API_URL}/product/images/${item.imagePath}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.nameProduct}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.nameProduct}
              subtitle={<Typography>
                Cantidad disponible {item.inventory}
                <br />
                {item.description}
              </Typography>}

              actionIcon={
                <>
                  {
                    isLogged ? <Box>
                      <IconButton
                        onClick={() => editProduct(item.id, item.nameProduct, item.inventory, item.description)}
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        aria-label={`Edit ${item.nameProduct}`}
                      >
                        <ModeEditIcon />
                      </IconButton>
                      <IconButton onClick={() => confirmDeleteProduct(item.id)}
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        aria-label={`Delete ${item.nameProduct}`}
                      >
                        <DeleteIcon color='error' />
                      </IconButton>
                    </Box> :
                      <PopoverShopping addProduct={addProduct} inventory={item.inventory} nameProduct={item.nameProduct} productID={item.id} />
                  }
                </>

              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    );
  }
  return (
    <>
      <Stack spacing={4}>
        <ListImages data={listProducts} />
      </Stack>
      <Stack
        direction="column"
        justifyContent="flex-end"
        alignItems="flex-end"
        spacing={1}
      >
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
          {
            isLogged ? <Fab style={style} onClick={() => createProduct()} title='Agregar nuevo producto' color="primary" aria-label="add">
              <AddIcon />
            </Fab> :
              <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                  <Fab aria-describedby={id} variant="contained" onClick={handleClick} style={style} title='Mis productos' color="secondary" aria-label="add">
                    <Badge color="primary" badgeContent={amountProducts} showZero>
                      <ShoppingCartIcon />
                    </Badge>
                  </Fab>
                </Box>
              </Toolbar>

          }

        </Box>
      </Stack>
      <FormProduct open={open} setOpen={setOpen} title={titleDrawer} product={productState} />
      <Popover
        id={id}
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
      >
        <List dense={false} sx={{
          bgcolor: 'primary.main'
        }}>
          <ListItem key={`itemTitle`}>
            <Stack direction={'row'} spacing={2}>
              <Typography color={'secondary'} variant='h6'>
                Mi canasta

              </Typography>
              <ShoppingBasketIcon color={'secondary'} />
            </Stack>
          </ListItem>
          {myProducts.map((value, index) => (
            <React.Fragment key={`item${index}`}>
              <ListItem 
                sx={{
                  bgcolor: 'whiteColor.main'
                }}
              >
                <ListItemAvatar>
                  <IconButton onClick={()=>removeProduct(value.id)} title='Remover' edge="end" aria-label="delete">
                    <RemoveShoppingCartIcon  color='error' />
                  </IconButton>
                </ListItemAvatar>
                <ListItemText
                  primary={`Producto: ${value.name}`}
                  secondary={
                    <>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {`Cantidad: ${value.amount}`}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>))}
          {
            amountProducts && <ListItem key={`itemPay`}>
              <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={1}
              >
                <Button variant="contained" color={'success'} endIcon={<ShoppingCartCheckoutIcon color='whiteColor' />}>
                  <Typography color={'whiteColor.main'} variant='p'>
                    Ir a pagar
                  </Typography>
                </Button>
              </Stack>
            </ListItem>
          }
        </List>
      </Popover>
    </>
  )
}


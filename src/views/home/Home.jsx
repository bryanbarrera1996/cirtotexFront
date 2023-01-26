import { Box, Fab, ImageList, ImageListItem, ListSubheader, Stack, ImageListItemBar, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getProducts } from '../../services/productService';
import AddIcon from '@mui/icons-material/Add';
import { FormProduct } from '../../components/form-product/FormProduct';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
export const Home = () => {
  const { token } = useSelector((selector) => selector.auth) || sessionStorage.getItem('access_token');
  const [open, setOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [listProducts, setListProducts] = useState([]);
  useEffect(() => {
    if (!listProducts.length) {
      getProducts().then((response) => {
        setListProducts(response);
        //http://localhost:3333/product/images/57968e27-22b2-48a2-a672-e8b0cb092b9d.png
      })
    }

    if (!!token) {
      setIsLogged(true);
    }
  }, [token]);
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
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        aria-label={`Edit ${item.nameProduct}`}
                      >
                        <ModeEditIcon />
                      </IconButton>
                      <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        aria-label={`Delete ${item.nameProduct}`}
                      >
                        <DeleteIcon color='error' />
                      </IconButton>
                    </Box> :
                      <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        aria-label={`Add to list ${item.nameProduct}`}
                      >
                        <AddShoppingCartIcon color={'tertiary'} />
                      </IconButton>
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
            isLogged && <Fab onClick={() => setOpen(true)} title='Agregar nuevo producto' color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          }

        </Box>
      </Stack>
      <FormProduct open={open} setOpen={setOpen} />
    </>
  )
}


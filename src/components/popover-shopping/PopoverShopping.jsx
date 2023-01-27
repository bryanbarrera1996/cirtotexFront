import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { IconButton, Popover, Box, Stack, TextField, Button } from '@mui/material';
import { useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
export const PopoverShopping = ({ nameProduct, productID, addProduct, inventory}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [amount, setAmount] = useState(0);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const reduceAmount = () => {
        if (amount > 0){
            setAmount(amount - 1);
        }   
    }
    const increaseAmount = () => {
        setAmount(amount + 1);
    }
    const addToCart = () =>{
        if (amount > inventory ){
            alert('No se cuenta con tantas unidades en stock');
        } else if (amount === 0){
            alert('Debes seleccionar una cantidad');
        }
        else {
            addProduct({
                id: productID,
                name: nameProduct,
                amount: amount
            });
        }
        
        //handleClose();
    }
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <>
            <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`Add to list ${nameProduct}`}
                aria-describedby={id} variant="contained"
                onClick={handleClick}
            >
                <AddShoppingCartIcon color={'tertiary'} />
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Box sx={{
                    p: 2
                }}>
                    <Stack spacing={2}>
                        <Stack spacing={2} direction={'row'}>
                            <IconButton onClick={reduceAmount} color="primary">
                                <RemoveCircleOutlineIcon />
                            </IconButton>
                            <TextField
                                size='small'
                                margin="normal"
                                required
                                fullWidth
                                name="inventory"
                                label="Cantidad"
                                type="number"
                                id="inventory"
                                value={amount}
                            />
                            <IconButton onClick={increaseAmount} color="primary">
                                <AddCircleOutlineIcon />
                            </IconButton>
                        </Stack>
                        <Stack
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                            spacing={2}
                        >
                            <Button onClick={addToCart} variant="contained" endIcon={<ShoppingCartIcon />}>
                                Agregar al carrito
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Popover>
        </>
    );
}
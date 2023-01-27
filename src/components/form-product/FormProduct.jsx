
import { Drawer, Box, Stack, Typography, Grid, IconButton, Avatar, TextField, Button, Container } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useEffect, useState } from 'react';
import { patchProducts, postProducts, uploadImage } from '../../services/productService';
import { useSelector } from 'react-redux';
const allowedExtensions = ["jpg", "png", "jpeg", "webp"];
export const FormProduct = ({ open = false, setOpen, title, product }) => {
    const { token } = useSelector((selector) => selector.auth) || sessionStorage.getItem('access_token');
    const closeDrawer = () => {
        setOpen(false);
    };
    const [selectedFile, setSelectedFile] = useState('');
    const [error, setError] = useState(0);
    const [colorCamera, setColorCamera] = useState('primary');

    const handleSubmit = (event) => {
        const data = new FormData(event.currentTarget);
        event.preventDefault();
        if (!data.get('nameProduct') || !data.get('inventory') || !data.get('description')) {
            alert('Los campos con * son obligatorios');
            return false;
        }

        if (!!product.id) {
            editProduct({
                id: product.id,
                nameProduct: data.get('nameProduct'),
                inventory: data.get('inventory'),
                description: data.get('description') || ''
            })
        } else {
            createProduct({
                nameProduct: data.get('nameProduct'),
                inventory: data.get('inventory'),
                description: data.get('description') || ''
            });
        }
    };

    const createProduct = (data) => {
        if (!!selectedFile) {
            uploadImage(token, selectedFile).then((response) => {
                if (!!response.fileName) {
                    const payload = {
                        nameProduct: data['nameProduct'],
                        inventory: data['inventory'],
                        description: data['description'] || '',
                        imagePath: response.fileName
                    }
                    postProducts(token, payload).then((response) => {
                        if (response) {
                            alert('Producto registrado');
                            window.location.reload();
                        } else {
                            alert('Ha ocurrido un error');
                        }

                    })
                } else {
                    alert('Ha ocurrido un error');
                }
            });
        } else {
            alert('Debes subir una imagen');
        }
    }

    const editProduct = (data) => {
        patchProducts(token, data).then((response) => {
            if (response) {
                alert('Producto actualizado');
                window.location.reload();
            } else {
                alert('Ha ocurrido un error');
            }
        })
    }
    useEffect(() => {
        if (!!selectedFile) {
            setColorCamera('success');
        } else {
            setColorCamera('primary');
        }
    }, [selectedFile])
    const handleFileChange = (e) => {
        setError(0);
        if (e.target.files.length) {
            const inputFile = e.target.files[0];

            const fileExtension = inputFile?.type.split("/")[1];
            if (!allowedExtensions.includes(fileExtension)) {
                setError(1);
                return;
            }
            setSelectedFile(inputFile);
        }
    };
    const Header = () => {
        return (
            <Box sx={{
                width: 'auto',
                height: 80,
                backgroundColor: 'pink.main',
            }}>
                <Grid container>
                    <Grid item md={1}>

                        <IconButton sx={{
                            pt: 1
                        }} color="primary" aria-label="close-drawer" onClick={closeDrawer} component="label">
                            <CloseIcon fontSize="large" color='whiteColor' />
                        </IconButton>

                    </Grid>
                    <Grid item md={10}>
                        <Stack direction={'row'} spacing={1} alignContent={'center'} justifyContent="center" alignItems={'center'}>
                            <Box sx={{
                                pt: 1
                            }}>
                                <img
                                    width={'160px'}
                                    height={'60'}
                                    src={`/assets/images/logoBlanco.webp`}
                                    alt='logo Toulouse'
                                />
                            </Box>

                        </Stack>
                    </Grid>

                </Grid>

            </Box>
        );
    }
    const FormProducts = () => {
        return (
            <Container component="main" maxWidth="md">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <ShoppingCartIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {title}
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item sm={12} md={6}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="nameProduct"
                                    label="Nombre del producto"
                                    name="nameProduct"
                                    autoFocus
                                    defaultValue={!!product.id ? product.productName : ''}
                                />
                            </Grid>
                            <Grid item sm={8} md={4}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="inventory"
                                    label="Cantidad"
                                    type="number"
                                    id="inventory"
                                    defaultValue={!!product.id ? product.inventory : ''}
                                />
                            </Grid>
                            <Grid item sm={4} md={2}>
                                <Stack
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    spacing={2}
                                >
                                    {
                                        !product.id && <IconButton color="primary" aria-label="upload picture" component="label">
                                            <input hidden accept="csv/*" type="file"
                                                onChange={handleFileChange}
                                            />
                                            <AddAPhotoIcon color={(error) ? 'error' : colorCamera} />
                                        </IconButton>
                                    }

                                </Stack>
                            </Grid>
                            <Grid item sm={12} md={12} lg={12}>
                                <TextField
                                    sx={{
                                        width: '100%'
                                    }}
                                    margin="normal"
                                    label="Description"
                                    multiline
                                    required
                                    rows={4}
                                    id="description"
                                    name="description"
                                    defaultValue={!!product.id ? product.description : ''}
                                />
                            </Grid>
                        </Grid>


                        <Typography color={'error'} variant="caption">
                        </Typography>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}

                        >
                            {!product.id ? 'Registrar' : 'Editar'}
                        </Button>
                    </Box>
                </Box>
            </Container>
        );
    }
    return (<Drawer
        open={open}
        anchor={'right'}
        PaperProps={{
            sx: {
                width: '35%'
            }
        }}
    >

        <Stack direction={'column'}>
            <Header />
            <FormProducts />
        </Stack>
    </Drawer>)
}
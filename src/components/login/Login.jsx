import React, { useState } from 'react';
import { Drawer, Box, Stack, Typography, Grid, IconButton, Container, CssBaseline, Avatar, TextField, Button, Link } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { auth } from '../../services/authService';
import { useDispatch } from 'react-redux';
import { login, setToken, setUser } from '../../redux/actions/authActions';
export const Login = ({ open = false, setOpen }) => {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        username: '',
        password: '',
        formErrors: { username: '', password: '' },
        usermaneValid: false,
        passwordValid: false,
        formValid: false
    });
    const closeDrawer = () => {
        setOpen(false);
        window.location.reload();
    }

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
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (!handleValidation(data.get('username'), data.get('password'))) {
            return false;
        }

        auth(data.get('username'), data.get('password')).then((response) => {
            if (response) {
                if (response.statusCode === 200) {
                    const user = {
                        username: response.data.username,
                        rol: response.data.rol
                    };
                    sessionStorage.setItem('access_token', response.access_token);
                    sessionStorage.setItem('userInfo', "true");
                    sessionStorage.setItem('user', JSON.stringify(user));
                    dispatch(login());
                    dispatch(setUser(user));
                    dispatch(setToken(response.data.access_token));
                    //window.location.reload();
                    closeDrawer();
                }
            } else {
                alert('Error de autenticacion');
            }
        });
    };
    const handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setState({ ...state, [name]: value });
    }

    const handleValidation = (username = '', password = '') => {
        let errors = {};
        let formIsValid = true;
        if (!password) {
            formIsValid = false;
            errors["password"] = "La contraseña no puede estar vacia";

        }
        if (!username) {
            formIsValid = false;
            errors["username"] = "El nombre de usuario no puede estar vacio";
        }

        if (!!username) {
            if (!username.match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["username"] = "Solo se permiten letras";
            }
        }


        setState({ ...state, formErrors: errors, username: username, password: password });
        return formIsValid;
    }

    const FormLogin = () => {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Iniciar Sesión
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            value={state.username}
                            id="username"
                            label="Usuario"
                            name="username"
                            autoFocus
                            onChange={(e) => handleUserInput(e)}
                        />
                        <Typography color={'error'} variant="caption">
                            {state.formErrors["username"] || ''}
                        </Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Typography color={'error'} variant="caption">
                            {state.formErrors["password"] || ''}
                        </Typography>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}

                        >
                            Ingresar
                        </Button>

                        <Stack direction={'row'} alignContent={'center'} alignItems={'center'} justifyContent={'center'}>
                            <Link href="#" variant="body2">
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </Stack>

                    </Box>
                </Box>
            </Container>);
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
            <FormLogin />
        </Stack>
    </Drawer>)
}
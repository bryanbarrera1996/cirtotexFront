import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Stack, useTheme, Typography, Button } from '@mui/material';
import { styleHeaderBar } from './styleHeaderBar';
import { UserLoggedIn } from '../user-logged-in/UserLoggedIn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Login } from '../login/Login';
import { login, setToken, setUser } from '../../redux/actions/authActions';
export const HeaderBar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const styles = styleHeaderBar(theme);
  const { authenticated } = useSelector((selector) => selector.auth);
  const { userInfo } = useSelector((selector) => selector.auth);
  const [stateLogin, setStateLogin] = useState(false);
  const validateSession = () => {
    if (sessionStorage.getItem('userInfo')) {
      const user = JSON.parse(sessionStorage.getItem('user'));
      dispatch(login());
      dispatch(setUser(user));
      dispatch(setToken(sessionStorage.getItem('access_token') || ''));
    }
  }
  useEffect(() => {
    validateSession();
     //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AppBar color='whiteColor' sx={styles.appBar}>
      <Stack
        alignItems='center'
        direction='row'
        justifyContent='space-between'
        sx={styles.content}
      >
        <img
          width={'120px'}
          height={'40'}
          src={`/assets/images/logoTolouse.webp`}
          alt='logo Toulouse'
        />
        {(authenticated)
          ? <UserLoggedIn name={userInfo.username || ''} />
          : <Stack
            alignItems='center'
            direction='row'
            spacing={4}
          >
            <Button variant="text" onClick={() => setStateLogin(true)}>
              <Stack direction={'row'} spacing={1} justifyContent="center"
                alignItems="center">
                <Typography color='primary' variant='subtitle2' sx={{
                  fontWeight: 600
                }}>Iniciar sesión
                </Typography>
                <AccountCircleIcon />
              </Stack>
            </Button>
          </Stack>
        }
      </Stack>
      <Login setOpen={setStateLogin} open={stateLogin} />
    </AppBar>
  )
}
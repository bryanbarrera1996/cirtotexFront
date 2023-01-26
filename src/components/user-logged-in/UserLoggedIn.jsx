import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {  Divider, IconButton, ListItemIcon, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { KeyboardArrowDown, Logout } from '@mui/icons-material';


export const UserLoggedIn = ({name}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    sessionStorage.removeItem('userInfo');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('access_token');
    window.location.reload();
  };

  return (
    <Stack alignItems='center' direction='row' spacing={4}>
      <Typography color='primary' variant='subtitle2' sx={{
        fontWeight: 600
      }}>{name}</Typography>
      <Stack direction='row'>
      <IconButton  
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined} 
        onClick={handleClick}
        size='small'
      >
        <KeyboardArrowDown />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Stack direction='row' justifyContent='center' sx={{widht: '100%', pt:1, pb:1}}>
        </Stack>        
        <Divider sx={{}}/>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize='small'/>
          </ListItemIcon>
          Cerrar Sesión
        </MenuItem>
      </Menu>
    </Stack>
    </Stack>
  )
}

UserLoggedIn.defaultProps = {
  name: 'pepito.peres'
}

UserLoggedIn.propTypes = {
  name: PropTypes.string
}

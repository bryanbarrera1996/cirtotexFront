import React  from 'react';
import { Outlet } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import { HeaderBar } from '../../components/header-bar/HeaderBar';
import { styleMainDashboard } from './styleMainDashboard';


export const MainDashboard = () => {
  const theme = useTheme();
  const styles = styleMainDashboard(theme, '20px');

  return (
    <Box sx={{ display: 'flex' }}>
      <HeaderBar />
      <Box
        bgcolor='background.default'
        component='main'
        sx={styles.containerContent}
      >
        <Outlet />
      </Box>
    </Box>
  )
}

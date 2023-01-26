import { createTheme } from "@mui/material";

/**
   * @name theme
   * @description material-ui theme settings
   * @param {theme} object //custom theme    
*/
export const theme = createTheme({
  typography: {
    fontFamily: [
      "Poppins"
    ].join(",")
  },
  palette:{
    primary:{
      main: "rgba(0, 0, 0, 0.87)"
    },
    secondary:{
      main: "#DC9F95"
    },
    tertiary:{
      main:"#FFC72C"
    },

    pink:{
      main: "#DC9F95"
    },
   success:{
    main:"#00e676"
   },
    background:{
      paper: "#FFFFFF",
      default: "#F8F8F8",
      box: "#F9FAFC"
    },
    whiteColor: {
      main: "#FFFFFF",
      paper: "#F4F7FC",
      paperOpacity:"#F4F7FC"
    },   
    error:{
      light: "#B00020",
      main: "#B00020",
      dark:"#B00020"
    },
    
  },
  customVariables:{
    drawerWidth: '60px',
    appBarHeight: '50px'
  }
});
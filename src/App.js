import { Provider } from 'react-redux';
import { ThemeProvider } from "@mui/material";
import { AppRouter } from "./routers/AppRouter";
import { theme } from './styles/configTheme';
import { store } from './redux/store/store';
export const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
    </Provider>

  )
}

export default App;
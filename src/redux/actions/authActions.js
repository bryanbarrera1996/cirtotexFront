import { types } from "../types/types";

export const setLoginApi = ({
    type: types.loginApi
});

export const setUser = (user) => ({
    type: types.authSetUser,
    payload: user
  });
  
  export const setToken = (token) => ({
    type: types.authSetToken,
    payload: token
  });
  
  
  export const cleanToken = () => ({
    type: types.authCleanToken
  });
  
  export const logOut = () => ({
    type: types.authLogout
  });
  
  export const login = () => ({
    type: types.authLogin
  });
import { types } from "../types/types";

const initialState = {
  authenticated: false,
  token: sessionStorage.getItem('access_token'),
  userInfo: {
    username: 'bryanba',
    rol: 'admin'
  }
}



export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        authenticated: true
      }

    case types.authLogout:
      return {
        initialState
      }

    case types.authSetUser:
      return {
        ...state,
        userInfo: action.payload
      }

    case types.authSetToken:
      return {
        ...state,
        token: action.payload
      }

    case types.authCleanToken:
      return {
        ...state,
        token: null
      }
    default:
      return state;
  }
}

import { types } from "../types/types";

const initialState = {
  loading: false,
  msg: null,
  countNotification: 1,
  selectedLanguage: "es",
  openModal: false,
  openDrawerExtended: false,
  embeddedPage: false
}


export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiSetMessage:
      return {
        ...state,
        msg: action.payload
      }

    case types.uiRemoveMessage:
      return {
        ...state,
        msg: null
      }

    case types.uiStartLoading:
      return {
        ...state,
        loading: true
      }

    case types.uiFinishLoading:
      return {
        ...state,
        loading: false
      }
    case types.uiChangeLanguage:
      return {
        ...state,
        selectedLanguage: action.payload
      }
    case types.uiOpenModal:
      return {
        ...state,
        openModal: action.payload
      }
    case types.uiOpenDrawerExtended:
      return {
        ...state,
        openDrawerExtended: action.payload
      }
    default:
      return state;
  }
}
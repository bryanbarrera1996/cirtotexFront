import { types } from "../types/types";

export const setMessage = (msg,severity) => ({
  type: types.uiSetMessage,
  payload: {msg,severity}
});

export const removeMessage = () => ({
  type: types.uiRemoveMessage
});

export const startLoading = () => ({
  type: types.uiStartLoading
})
export const finishLoading = () => ({
  type: types.uiFinishLoading
})

export const changeLanguage = (language) =>({
  type: types.uiChangeLanguage,
  payload: language
});

export const handleOpenModal = (open) => ({
  type: types.uiOpenModal,
  payload: open
}); 

export const handleOpenDrawerExtended = (state) => ({
  type: types.uiOpenDrawerExtended,
  payload: state 
});

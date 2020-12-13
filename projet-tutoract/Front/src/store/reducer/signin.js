// --- initial state
const initialState = {
  inputSigninEmail: '',
  inputSigninPassword: '',
  nameSigninEmail: '',
  nameSigninPassword: '',
  message: '',
  setOpen: false,
};

// --- action types
const HANDLE_SIGNIN_INPUT_EMAIL = 'HANDLE_SIGNIN_INPUT_EMAIL';
const HANDLE_SIGNIN_INPUT_PASSWORD = 'HANDLE_SIGNIN_INPUT_PASSWORD';
const HANDLE_ERROR_MESSAGE = 'HANDLE_ERROR_MESSAGE';
const OPEN_MESSAGE = 'OPEN_MESSAGE';
export const HANDLE_SIGNIN_SUBMIT = 'HANDLE_SIGNIN_SUBMIT';
const CLOSE_SNACKBARS = 'CLOSE_SNACKBARS';

// --- Reducer
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case HANDLE_SIGNIN_INPUT_EMAIL:
      return {
        ...state,
        inputSigninEmail: action.inputValue,
        nameSigninEmail: action.nameValue,
      };
    case HANDLE_SIGNIN_INPUT_PASSWORD:
      return {
        ...state,
        inputSigninPassword: action.inputValue,
        nameSigninPassword: action.nameValue,
      };
    case HANDLE_ERROR_MESSAGE:
      return {
        ...state,
        message: 'Mais non Zinedine, pas ça ! Tu t\'es trompé !',
      };
    case OPEN_MESSAGE:
      return {
        ...state,
        setOpen: true,
      };
    case CLOSE_SNACKBARS:
      return {
        ...state,
        setOpen: false,
      };

    default: return state;
  }
};

export const handleSigninEmailInput = (inputValue, nameValue) => ({
  type: HANDLE_SIGNIN_INPUT_EMAIL,
  inputValue,
  nameValue,
});
export const handleSigninPasswordInput = (inputValue, nameValue) => ({
  type: HANDLE_SIGNIN_INPUT_PASSWORD,
  inputValue,
  nameValue,
});
export const handleSubmit = () => ({
  type: HANDLE_SIGNIN_SUBMIT,
});
export const setOpen = () => ({
  type: OPEN_MESSAGE,
});
export const setErrorMessage = () => ({
  type: HANDLE_ERROR_MESSAGE,
});
export const setClose = () => ({
  type: CLOSE_SNACKBARS,
});
export default reducer;

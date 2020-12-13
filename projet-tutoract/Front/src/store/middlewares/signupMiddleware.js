import axios from 'axios';
// import action du reducer signin
import { HANDLE_SIGNUP_SUBMIT, GET_TECHS, handleTechs, getErrorMessage, openSnackbars } from 'src/store/reducer/signup';


// eslint-disable-next-line consistent-return
const signupMiddleware = (store) => (next) => (action) => {
  const dataSignup = {
    email: `${store.getState().signup.inputEmail}`,
    password: `${store.getState().signup.inputPassword}`,
    confirm_password: `${store.getState().signup.inputConfirmPassword}`,
    role: `${store.getState().signup.role}`,
    techs: store.getState().signup.techs,
  };
  switch (action.type) {
    case HANDLE_SIGNUP_SUBMIT:
    // plus tard appel axios ici
      axios.post(`${process.env.REACT_APP_BASE_URL}api/v1/users/`, dataSignup)
        .then((res) => {
          const { severity, message } = res.data;
          store.dispatch(getErrorMessage(severity, message));
          store.dispatch(openSnackbars());
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    case GET_TECHS:
      axios.get(`${process.env.REACT_APP_BASE_URL}api/v1/techs/`)
        .then((res) => {
          const { data } = res;
          store.dispatch(handleTechs(data));
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    default:
      next(action);
  }
};

export default signupMiddleware;

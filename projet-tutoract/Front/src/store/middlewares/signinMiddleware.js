// installer axios first "yarn add axios"
import axios from 'axios';

// import action du reducer signin
import { HANDLE_SIGNIN_SUBMIT, setErrorMessage, setOpen } from 'src/store/reducer/signin';
import { loggedUser } from 'src/store/reducer/user';


// eslint-disable-next-line consistent-return
const signinMiddleware = (store) => (next) => (action) => {
  const credentials = {
    username: `${store.getState().signin.inputSigninEmail}`,
    password: `${store.getState().signin.inputSigninPassword}`,
  };
  switch (action.type) {
    case HANDLE_SIGNIN_SUBMIT:
    // appel axios ici
      try {
        axios
          .post(`${process.env.REACT_APP_BASE_URL}api/login_check`, credentials)
          .then((response) => (response.data.token))
          .then((token) => {
            window.localStorage.setItem('token', token);
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            const getItem = window.localStorage.getItem('token');
            if (getItem) {
              store.dispatch(loggedUser());
            }
          })
          .catch((er) => {
            store.dispatch(setErrorMessage());
            store.dispatch(setOpen());
          });
      }
      catch (error) {
        console.log(error);
      }
      // finally {
      //   store.dispatch(loggedUser);
      // }
      break;
    default:
      next(action);
  }
};

export default signinMiddleware;

import axios from 'axios';
// import action du reducer signin
// eslint-disable-next-line consistent-return
import { loggedUser } from 'src/store/reducer/user';

const autorizationMiddleware = (store) => (next) => (action) => {
  const getItem = window.localStorage.getItem('token');
  if (getItem !== null) {
    axios.defaults.headers.Authorization = `Bearer ${getItem}`;
    loggedUser();
  }
  next(action);
};

export default autorizationMiddleware;

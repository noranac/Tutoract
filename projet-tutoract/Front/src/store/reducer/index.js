import { combineReducers } from 'redux';

// j'importe mes reducers
import signup from './signup';
import signin from './signin';
import user from './user';
import profil from './profil';
import event from './event';
import messenger from './messenger';
import message from './message';
// l'intérêt d'avoir plusieurs reducers est de classer les informations par catégorie,
// plus facile pour s'y retrouver

// je veux combiner mes reducers en un seul, puisque le store gère un seul reducer
// combineReducers retourne un objet
// https://redux.js.org/api/combinereducers/
const reducer = combineReducers({
  // user: user,
  signin,
  signup,
  user,
  profil,
  event,
  messenger,
  message,
});

export default reducer;

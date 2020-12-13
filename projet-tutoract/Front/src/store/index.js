// == Import : npm
import { createStore, compose, applyMiddleware } from 'redux';

// == Import : local
import reducer from 'src/store/reducer';
import autorizationMiddleware from 'src/store/middlewares/autorizationMiddleware';
import signinMiddleware from 'src/store/middlewares/signinMiddleware';
import signupMiddleware from 'src/store/middlewares/signupMiddleware';
import profilMiddleware from 'src/store/middlewares/profilMiddleware';
import eventTechMiddleware from 'src/store/middlewares/eventTechMiddleware';
import messengerMiddleware from 'src/store/middlewares/messengerMiddleware';
import messageMiddleware from 'src/store/middlewares/messageMiddleware';
// == Store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(
    autorizationMiddleware,
    signinMiddleware,
    signupMiddleware,
    profilMiddleware,
    eventTechMiddleware,
    messengerMiddleware,
    messageMiddleware,
  ),
);

const store = createStore(
  reducer,
  enhancers,
);

// == Export
export default store;

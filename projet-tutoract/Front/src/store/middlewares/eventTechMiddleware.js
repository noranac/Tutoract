// installer axios first "yarn add axios"
import axios from 'axios';
import {
  GET_EVENT,
  setEvent,
  GET_MAIN_TECHS,
  setTechs,
  setRedirectOn,
  SET_TOPIC,
  setEventMessage,
  setEventOpen,
  setErrorEvent,
} from 'src/store/reducer/event';


// eslint-disable-next-line consistent-return
const eventTechMiddleware = (store) => (next) => (action) => {
  const techId = store.getState().event.id;
  switch (action.type) {
    case GET_EVENT:
      axios.get(`${process.env.REACT_APP_BASE_URL}api/v1/techs/${techId}/events/`)
        .then((res) => {
          const techsEvent = res.data;
          store.dispatch(setEvent(techsEvent));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          store.dispatch(setRedirectOn());
        });
      break;
    case GET_MAIN_TECHS:
      axios.get(`${process.env.REACT_APP_BASE_URL}api/v1/techs/`)
        .then((res) => {
          const { data } = res;
          store.dispatch(setTechs(data));
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    case SET_TOPIC: {
      const { eventId } = store.getState().event;
      const credentials = {
        description: `${store.getState().event.topic}`,
      };
      axios.post(`${process.env.REACT_APP_BASE_URL}api/v1/events/${eventId}/users`, credentials)
        .then((res) => {
          const { severity, message } = res.data;
          store.dispatch(setEventMessage(severity, message));
          store.dispatch(setEventOpen());
        })
        .catch(() => {
          store.dispatch(setErrorEvent());
          store.dispatch(setEventOpen());
        });
      break;
    }
    default:
      next(action);
  }
};

export default eventTechMiddleware;

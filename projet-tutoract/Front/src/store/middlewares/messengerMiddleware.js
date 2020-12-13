import axios from 'axios';
// import action du reducer signin
import { GET_INFO_USERS, getEventInfos, eventRedirectOn, GET_INFO_EVENT, getDescriptions, SUBMIT_CONTENT, clearInput } from 'src/store/reducer/messenger';
// eslint-disable-next-line consistent-return
const messengerMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case GET_INFO_USERS: {
      const { eventId } = store.getState().messenger;
      axios.get(`${process.env.REACT_APP_BASE_URL}api/v1/events/${eventId}/users`)
        .then((res) => {
          const { owner, users } = res.data;
          store.dispatch(getEventInfos(owner, users));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          store.dispatch(eventRedirectOn());
        });
      break;
    }
    case GET_INFO_EVENT: {
      const { eventId } = store.getState().messenger;
      axios.get(`${process.env.REACT_APP_BASE_URL}api/v1/events/${eventId}`)
        .then((res) => {
          const { description, tech } = res.data;
          store.dispatch(getDescriptions(description, tech));
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    }
    case SUBMIT_CONTENT: {
      const { eventId } = store.getState().messenger;
      const content = {
        content: `${store.getState().messenger.content}`,
      };
      axios.post(`${process.env.REACT_APP_BASE_URL}api/v1/events/${eventId}/messages`, content)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          store.dispatch(clearInput());
        });
      break;
    }
    default:
      next(action);
  }
};

export default messengerMiddleware;

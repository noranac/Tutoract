import axios from 'axios';
// import action du reducer signin
import { GET_CONTENT, setNewContents } from 'src/store/reducer/message';

// eslint-disable-next-line consistent-return
const messageMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case GET_CONTENT: {
      const { eventId } = store.getState().messenger;
      axios.get(`${process.env.REACT_APP_BASE_URL}api/v1/events/${eventId}/messages`)
        .then((res) => {
          const { data } = res;
          store.dispatch(setNewContents(data));
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    }
    default:
      next(action);
  }
};

export default messageMiddleware;

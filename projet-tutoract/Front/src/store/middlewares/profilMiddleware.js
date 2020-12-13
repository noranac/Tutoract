// installer axios first "yarn add axios"
import moment from 'moment';
import axios from 'axios';
import { GET_USER_INFOS, logUser } from 'src/store/reducer/user';
import {
  HANDLE_PROFIL_SUBMIT,
  unDisplayForm,
  HANDLE_EVENT_SUBMIT,
  SEND_CREATED_SUBMIT,
  UPLOAD_IMAGE,
  loadDatas,
  setMessage,
  openSnackBars,
  openLessonSnackBars,
  setMessageCreatedEvents,
  setLesson,
  reloadDatas,
  openCreatedSnackBars,
} from 'src/store/reducer/profil';


// eslint-disable-next-line consistent-return
const profilMiddleware = (store) => (next) => (action) => {
  const userId = store.getState().user.id;
  const credentials = {
    city: `${store.getState().profil.inputCity}`,
    nickname: `${store.getState().profil.inputNickname}`,
  };
  const nextDate = store.getState().profil.date;
  const nextDateToTime = moment(nextDate).format('YYYY-MM-DD HH:mm:ss');
  const data = {
    date: `${nextDateToTime}`,
    id: store.getState().profil.tech_id,
    limit: store.getState().profil.limit,
  };
  const { changeDate } = store.getState().profil;
  const changeDateToTime = moment(changeDate).format('YYYY-MM-DD HH:mm:ss');
  const dataChange = {
    date: `${changeDateToTime}`,
    description: `${store.getState().profil.topic}`,
  };
  switch (action.type) {
    case GET_USER_INFOS:
      axios.get(`${process.env.REACT_APP_BASE_URL}api/v1/users/profile`)
        .then((res) => {
          // eslint-disable-next-line camelcase
          const {
            id,
            avatar,
            city,
            promo,
            events,
            eventsOwned,
            firstname,
            github_account,
            lastname,
            linkedin_account,
            nickname,
            roles,
            techs,
            twitter_account,
          } = res.data;
          store.dispatch(logUser(
            id,
            avatar,
            city,
            events,
            promo,
            eventsOwned,
            firstname,
            github_account,
            lastname,
            linkedin_account,
            nickname,
            roles,
            techs,
            twitter_account,
          ));
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    case HANDLE_PROFIL_SUBMIT:
      axios.put(`${process.env.REACT_APP_BASE_URL}api/v1/users/${userId}`, credentials)
        .then((res) => {
          const { severity, message } = res.data;
          store.dispatch(setMessage(severity, message));
          store.dispatch(openSnackBars());
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          store.dispatch(loadDatas());
          store.dispatch(unDisplayForm());
        });
      break;
    case HANDLE_EVENT_SUBMIT:
      axios.post(`${process.env.REACT_APP_BASE_URL}api/v1/events/`, data)
        .then((res) => {
          const { severity, message } = res.data;
          store.dispatch(setLesson(severity, message));
          store.dispatch(openLessonSnackBars());
          store.dispatch(reloadDatas());
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    case SEND_CREATED_SUBMIT: {
      const { eventId } = store.getState().profil;
      axios.put(`${process.env.REACT_APP_BASE_URL}api/v1/events/${eventId}`, dataChange)
        .then((res) => {
          const { severity, message } = res.data;
          store.dispatch(setMessageCreatedEvents(severity, message));
          store.dispatch(openCreatedSnackBars());
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    }
    case UPLOAD_IMAGE: {
      const { picture } = store.getState().profil;
      const avatarData = new FormData();
      avatarData.append('avatar[avatar]', picture);
      axios.post(`${process.env.REACT_APP_BASE_URL}api/v1/users/uploadavatar`, avatarData)
        .then((res) => {
          console.log(res);
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

export default profilMiddleware;

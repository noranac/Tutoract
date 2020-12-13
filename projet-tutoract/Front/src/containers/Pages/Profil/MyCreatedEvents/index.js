import { connect } from 'react-redux';
import MyCreatedEvents from 'src/components/Pages/Profil/MyCreatedEvents';
import { toggleMySettings, setForm, setTopic, setDate, setId, sendUpdatedSubmit, setCreatedDate, setCreatedClose } from 'src/store/reducer/profil';
import { sendInfos, sendSubmit } from 'src/store/reducer/messenger';
import { getContent } from 'src/store/reducer/message';

const mapStateToProps = (state) => ({
  isOpen: state.profil.mySettings,
  isDisplay: state.profil.isDisplay,
  topic: state.profil.topic,
  changeDate: state.profil.changeDate,
  setCreatedOpen: state.profil.setCreatedOpen,
  messageName: state.profil.messageName,
  severityName: state.profil.severityName,
});

const mapDispatchToProps = (dispatch) => ({
  toggleMySettings: () => {
    dispatch(toggleMySettings());
  },
  setForm: () => {
    dispatch(setForm());
  },
  setTopic: (newTopic) => {
    dispatch(setTopic(newTopic));
  },
  setDate: (newDate) => {
    dispatch(setDate(newDate));
  },
  setId: (eventId) => {
    dispatch(setId(eventId));
  },
  sendUpdatedSubmit: () => {
    dispatch(sendUpdatedSubmit());
  },
  sendSubmit: () => {
    dispatch(sendSubmit());
  },
  setCreatedDate: (changeDate) => {
    dispatch(setCreatedDate(changeDate));
  },
  sendInfos: (eventId, techName) => {
    dispatch(sendInfos(eventId, techName));
  },
  getContent: () => {
    dispatch(getContent());
  },
  setCreatedClose: () => {
    dispatch(setCreatedClose());
  },
});

const MyCreatedEventsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyCreatedEvents);

export default MyCreatedEventsContainer;

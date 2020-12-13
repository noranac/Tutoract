import { connect } from 'react-redux';
import MyEvent from 'src/components/Pages/Profil/MyEvent';
import { toggleSettings } from 'src/store/reducer/profil';
import { sendInfos, sendSubmit } from 'src/store/reducer/messenger';
import { getContent } from 'src/store/reducer/message';


const mapStateToProps = (state) => ({
  isOpen: state.profil.settingsOpen,
});

const mapDispatchToProps = (dispatch) => ({
  toggleSettings: () => {
    dispatch(toggleSettings());
  },
  sendInfos: (eventId, techName) => {
    dispatch(sendInfos(eventId, techName));
  },
  sendSubmit: () => {
    dispatch(sendSubmit());
  },
  getContent: () => {
    dispatch(getContent());
  },
});

const MyEventContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyEvent);

export default MyEventContainer;

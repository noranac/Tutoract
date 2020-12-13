import { connect } from 'react-redux';
import Messenger from 'src/components/Pages/Messenger';
import { eventRedirectOff, getInfoEvent, sendContent, submitContent } from 'src/store/reducer/messenger';

const mapStateToProps = (state) => ({
  owner: state.messenger.owner,
  users: state.messenger.users,
  tech: state.messenger.tech,
  description: state.messenger.description,
  content: state.messenger.content,
});

const mapDispatchToProps = (dispatch) => ({
  eventRedirectOff: () => {
    dispatch(eventRedirectOff());
  },
  getInfoEvent: () => {
    dispatch(getInfoEvent());
  },
  sendContent: (newContent) => {
    dispatch(sendContent(newContent));
  },
  submitContent: () => {
    dispatch(submitContent());
  },
});

const MessengerContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Messenger);

export default MessengerContainer;

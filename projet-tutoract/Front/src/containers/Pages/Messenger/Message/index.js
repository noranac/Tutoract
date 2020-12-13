import { connect } from 'react-redux';
import Message from 'src/components/Pages/Messenger/Message';
import { getContent } from 'src/store/reducer/message';

const mapStateToProps = (state) => ({
  messageData: state.message.messageData,
  userId: state.user.id,
  eventId: state.messenger.eventId,
  messageDate: state.message.messageData,
  updateMessage: state.message.updateMessage,
});

const mapDispatchToProps = (dispatch) => ({
  getContent: () => {
    dispatch(getContent());
  },
});

const MessageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Message);

export default MessageContainer;

import { connect } from 'react-redux';
import Event from 'src/components/Pages/Event';
import { getEventTech, setRedirectOff, sendTopic, setSubmit, setId, setClose } from 'src/store/reducer/event';

const mapStateToProps = (state) => ({
  name: state.event.techEvents.name,
  id: state.event.techEvents.id,
  events: state.event.techEvents.events,
  topic: state.event.topic,
  message: state.event.message,
  severity: state.event.severity,
  setOpen: state.event.setOpen,
});

const mapDispatchToProps = (dispatch) => ({
  getEventTech: () => {
    dispatch(getEventTech());
  },
  setRedirectOff: () => {
    dispatch(setRedirectOff());
  },
  sendTopic: (value) => {
    dispatch(sendTopic(value));
  },
  setSubmit: () => {
    dispatch(setSubmit());
  },
  setId: (eventId) => {
    dispatch(setId(eventId));
  },
  setClose: () => {
    dispatch(setClose());
  },
});

const EventContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Event);

export default EventContainer;

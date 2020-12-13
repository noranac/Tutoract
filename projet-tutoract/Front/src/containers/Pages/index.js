import { connect } from 'react-redux';
import Pages from 'src/components/Pages';


const mapStateToProps = (state) => ({
  isLogged: state.user.logged,
  redirect: state.event.redirect,
  techName: state.event.techName,
  eventRedirect: state.messenger.eventRedirect,
  eventTech: state.messenger.techName,
});

const mapDispatchToProps = {};

const PagesContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Pages);

export default PagesContainer;

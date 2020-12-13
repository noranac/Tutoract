import { connect } from 'react-redux';
import App from 'src/components/App';
import { loggedUser } from 'src/store/reducer/user';


const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  loggedUser: () => {
    dispatch(loggedUser());
  },
});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default AppContainer;

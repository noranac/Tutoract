import { connect } from 'react-redux';
import Nav from 'src/components/Nav';
import { unloggedUser, } from 'src/store/reducer/user';

const mapStateToProps = (state) => ({
  isLogged: state.user.logged,
  avatar: state.user.avatar,
});

const mapDispatchToProps = (dispatch) => ({
  unloggedUser: () => {
    dispatch(unloggedUser());
  },
});

const NavContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Nav);

export default NavContainer;

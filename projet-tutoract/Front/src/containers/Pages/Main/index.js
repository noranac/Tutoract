import { connect } from 'react-redux';
import Main from 'src/components/Pages/Main';
import { getUserInfos } from 'src/store/reducer/user';
import { getEventTech, getTechs, sendTechId } from 'src/store/reducer/event';

const mapStateToProps = (state) => ({
  isLogged: state.user.logged,
  techs: state.event.techs,
});

const mapDispatchToProps = (dispatch) => ({
  getEventTech: () => {
    dispatch(getEventTech());
  },
  getTechs: () => {
    dispatch(getTechs());
  },
  sendTechId: (techId, techName) => {
    dispatch(sendTechId(techId, techName));
  },
  getUserInfos: () => {
    dispatch(getUserInfos());
  },
});

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);

export default MainContainer;

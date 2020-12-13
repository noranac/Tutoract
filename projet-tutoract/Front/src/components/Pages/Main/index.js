/* eslint-disable brace-style */
/* eslint-disable block-spacing */
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import home1 from 'src/assets/images/home1.jpg';
import home2 from 'src/assets/images/home2.jpg';
import home3 from 'src/assets/images/home3.jpg';
import home4 from 'src/assets/images/home4.jpg';
import home5 from 'src/assets/images/home5.jpg';
import home6 from 'src/assets/images/home6.jpg';
import home7 from 'src/assets/images/home7.jpg';
import homepage from 'src/assets/images/homepage.jpg';
import homepage2 from 'src/assets/images/homepage2.jpg';
import homepage3 from 'src/assets/images/homepage3.jpg';
import homepage4 from 'src/assets/images/homepage4.jpg';
import homepage5 from 'src/assets/images/homepage5.jpg';
import './main.scss';


const Main = ({ isLogged, getEventTech, getTechs, techs, sendTechId, getUserInfos }) => {
  useEffect(() => {
    const getItem = window.localStorage.getItem('token');
    if (getItem !== null) {
      getUserInfos();
      getTechs();
    }
  }, []);
  const handleClick = (techId, techName) => {
    sendTechId(techId, techName);
    getEventTech();
  };
  return (
    <>
      {!isLogged && (
      <div className="main-visitor">
        <img className="main-visitor-img" src={home1} alt="home" />
        <img className="main-visitor-img" src={home2} alt="home" />
        <img className="main-visitor-img" src={home3} alt="home" />
        <img className="main-visitor-img" src={home4} alt="home" />
        <img className="main-visitor-img" src={home5} alt="home" />
        <img className="main-visitor-img" src={home6} alt="home" />
        <NavLink to="/signup">
          <img className="main-visitor-img" src={home7} alt="home" />
        </NavLink>
      </div>
      )}
      {isLogged && (
        <div className="main-logged">
          <img className="main-logged-img" alt="homepage" src={homepage} />
          <img className="main-logged-img" alt="homepage" src={homepage2} />
          <img className="main-logged-img" alt="homepage" src={homepage3} />
          <img className="main-logged-img" alt="homepage" src={homepage4} />
          <img className="main-logged-img" alt="homepage" src={homepage5} />
          <p className="main-logged-paragraph">J'ai besoin d'aide en...</p>
          {techs.map((tech) => (
            <ExpansionPanel key={tech.id} className="main-logged-accordeon">
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className="main-logged-arrow"
              >
                <Typography className="main-logged-title">{tech.name}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className="main-logged-expansion">
                <Typography className="main-logged-description">
                  {tech.description}
                </Typography>
                <Button variant="contained" color="primary" onClick={() => {handleClick(tech.id, tech.name);}}>Voir les cours</Button>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
        </div>
      )}
    </>
  );
};

Main.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  getEventTech: PropTypes.func.isRequired,
  getTechs: PropTypes.func.isRequired,
  sendTechId: PropTypes.func.isRequired,
  techs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default Main;

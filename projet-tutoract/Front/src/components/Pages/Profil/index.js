import React, { useEffect } from 'react';
import {Route, NavLink} from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker';
import { Avatar, Chip, Button, Snackbar } from '@material-ui/core';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';
import MyEventToggle from 'src/containers/Pages/Profil/MyEventToggle';
import PropTypes from 'prop-types';
import ProfilForm from 'src/containers/Pages/Profil/ProfilForm';
import MyCreatedEvents from 'src/containers/Pages/Profil/MyCreatedEvents';
import './profil.scss';
import { prototype } from 'stream';

const Profil = ({
  getUserInfos,
  avatar,
  city,
  promo,
  events,
  eventsOwned,
  firstname,
  githubAccount,
  lastname,
  linkedinAccount,
  nickname,
  roles,
  techs,
  twitterAccount,
  handleDisplay,
  displayform,
  unDisplayForm,
  date,
  setDate,
  handleEventSubmit,
  setlimit,
  setTech,
  getDatas,
  setOpen,
  setLessonOpen,
  severity,
  message,
  severityLesson,
  messageLesson,
  setClose,
  closeLessonSnackBars,
  reloadInfos,
}) => {
  useEffect(() => {
    getUserInfos();
    return () => {
      unDisplayForm();
    };
  }, []);
  useEffect(() => {
    getUserInfos();
  }, [getDatas]);
  useEffect(() => {
    getUserInfos();
  }, [reloadInfos]);
  const undisplayForm = () => {
    unDisplayForm();
  };
  const Alert = (props) => (
    <MuiAlert elevation={6} variant="filled" {...props} />
  );
  const handleClose = () => {
    setClose();
    closeLessonSnackBars();
  };
  const changeDate = (value) => {
    setDate(value);
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleEventSubmit();
  };
  const tutorRole = roles.filter((role) => role === 'ROLE_TUTOR');
  const turorRoletoS = tutorRole.toString();
  const displayForm = () => {
    handleDisplay();
  };
  const handleSelect = (evt) => {
    const { value } = evt.target;
    setlimit(value);
  };
  const handleSelectTech = (evt) => {
    const { value } = evt.target;
    setTech(value);
  };
  return (
    <>
      <div className="profile">
        <div className="profile-box">
          {displayform && (
            <>
              <CloseIcon className="profile-close" onClick={undisplayForm} />
              <ProfilForm />
            </>
          )}
          {!displayform && (
            <>
              <h1 className="profile-title">Mon Tutofil</h1>
              <Avatar className="profile-avatar" src={`${process.env.REACT_APP_BASE_URL}avatars/${avatar}`} />
              <div className="profile-description">
                <div className="profile-info">
                  <p>Promo: {promo.name}</p>
                  <p>Nom: {lastname}</p>
                  <p>Prénom:  {firstname}</p>
                  <p>Ville: {city}</p>
                  <p>Pseudo:  {nickname}</p>
                </div>
                <form method="POST" className="profile-event" onSubmit={handleSubmit}>
                  {turorRoletoS === 'ROLE_TUTOR' && (
                    <>
                      <h2 className="profile-config">Tech</h2>
                      <ul>
                        {techs.map((tech) => (
                          <Chip color="primary" key={tech.id} label={tech.name} />
                        ))}
                      </ul>
                      <h3 className="profile-config">Choisis la techno pour ton cours: </h3>
                      <select onClick={handleSelectTech} id="tech" name="id">
                        {techs.map((tech) => (
                          <option value={tech.id} color="primary" key={tech.id} label={tech.name}>{tech.name}</option>
                        ))}
                      </select>
                      <h3 className="profile-config">Nombre d'étudiant au cours:</h3>
                      <select onClick={handleSelect} id="limit" name="limit">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                      <h3 className="profile-config">Disponibilité:</h3>
                      <DateTimePicker
                        onChange={changeDate}
                        value={date}
                      />
                      <Button className="profile-button" type="submit" variant="contained" color="primary">
                        Créer un cours
                      </Button>
                      <Snackbar open={setLessonOpen} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity={severityLesson}>
                          {messageLesson}
                        </Alert>
                      </Snackbar>
                    </>
                  )}
                  <BorderColorIcon className="profile-icon" onClick={displayForm} />
                </form>
              </div>
            </>
          )}
          <Snackbar open={setOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity}>
              {message}
            </Alert>
          </Snackbar>
        </div>
        <MyEventToggle events={events} />
        {turorRoletoS === 'ROLE_TUTOR' && <MyCreatedEvents eventsOwned={eventsOwned} />}
      </div>
    </>
  );
};

Profil.propTypes = {
  setLessonOpen: PropTypes.bool.isRequired,
  messageLesson: PropTypes.string.isRequired,
  severityLesson: PropTypes.string.isRequired,
  reloadInfos: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  closeLessonSnackBars: PropTypes.func.isRequired,
  setClose: PropTypes.func.isRequired,
  severity: PropTypes.string.isRequired,
  setOpen: PropTypes.bool.isRequired,
  getDatas: PropTypes.func.isRequired,
  handleDisplay: PropTypes.func.isRequired,
  getUserInfos: PropTypes.func.isRequired,
  avatar: PropTypes.string,
  city: PropTypes.string,
  events: PropTypes.array.isRequired,
  eventsOwned: PropTypes.array.isRequired,
  firstname: PropTypes.string.isRequired,
  promo: PropTypes.object.isRequired,
  githubAccount: PropTypes.string,
  lastname: PropTypes.string.isRequired,
  linkedinAccount: PropTypes.string,
  nickname: PropTypes.string,
  displayform: PropTypes.bool.isRequired,
  unDisplayForm: PropTypes.func.isRequired,
  roles: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  techs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  twitterAccount: PropTypes.string,
  date: PropTypes.string.isRequired,
  setDate: PropTypes.func.isRequired,
  handleEventSubmit: PropTypes.func.isRequired,
  setlimit: PropTypes.func.isRequired,
  setTech: PropTypes.func.isRequired,
};
Profil.defaultProps = {
  linkedinAccount: null,
  avatar: null,
  city: null,
  nickname: null,
  twitterAccount: null,
  githubAccount: null,
};
export default Profil;

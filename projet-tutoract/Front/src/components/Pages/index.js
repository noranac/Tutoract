import React from 'react';
import {
  Route,
  Switch,
  Redirect,
}
  from 'react-router-dom';
import PropTypes from 'prop-types';
import Main from 'src/containers/Pages/Main';
import SignUpForm from 'src/containers/Pages/SignUpForm';
import SignInForm from 'src/containers/Pages/SignInForm';
import Profil from 'src/containers/Pages/Profil';
import sanitizeHtml from 'sanitize-html';
import Event from 'src/containers/Pages/Event';
import Messenger from 'src/containers/Pages/Messenger';

const Pages = ({
  isLogged, redirect, techName, eventRedirect, eventTech,
}) => {
  const techNametoLower = techName.toLowerCase();
  const getItem = window.localStorage.getItem('token');
  const techNameClean = sanitizeHtml(techNametoLower);
  const eventTechtoLower = eventTech.toLowerCase();
  const eventTechClean = sanitizeHtml(eventTechtoLower);
  const url = '/events/';
  const messengerUrl = '/messenger/';
  return (
    <Switch>
      <Route path="/" exact>
        {redirect ? <Redirect to={url + techNameClean} /> : <Main />}
      </Route>
      <Route path="/myprofile">
        {!getItem && <Redirect to="/" />}
        {getItem && eventRedirect ? <Redirect to={messengerUrl + eventTechClean} /> : <Profil />}
      </Route>
      <Route path="/events/">
        {!isLogged ? <Redirect to="/" /> : <Event />}
      </Route>
      <Route path="/messenger">
        {!getItem ? <Redirect to="/" /> : <Messenger />}
      </Route>
      {isLogged && <Redirect to="/" />}
      {!isLogged && (
        <>
          <Route path="/signup">
            <SignUpForm />
          </Route>
          <Route path="/signin">
            <SignInForm />
          </Route>
        </>
      )}
    </Switch>
  );
};

Pages.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  redirect: PropTypes.bool.isRequired,
  techName: PropTypes.string.isRequired,
  eventTech: PropTypes.string.isRequired,
  eventRedirect: PropTypes.bool.isRequired,
};
export default Pages;

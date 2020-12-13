import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import { Navbar, Nav as BNav, Image } from 'react-bootstrap';
import Logo from 'src/assets/images/logo-01.png';
import 'bootstrap/dist/css/bootstrap.min.css';

import './nav.scss';

// NavBar WIP restant a géré les actives if connect/disconnect
const Nav = ({ isLogged, unloggedUser, avatar }) => {
  const clearLocalStorage = () => {
    window.localStorage.removeItem('token');
    unloggedUser();
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand className="title" as={NavLink} to="/" exact>
        <Image as={NavLink} to="/" src={Logo} alt="logotutoract" className="avatar" />
        Tutoract
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        {!isLogged && (
          <BNav className="ml-auto">
            <BNav.Link as={NavLink} to="/signup">S'inscrire</BNav.Link>
            <BNav.Link as={NavLink} to="/signin">Se connecter</BNav.Link>
          </BNav>
        )}
        {isLogged && (
          <>
            <BNav className="ml-auto">
              <BNav.Link onClick={clearLocalStorage}>Se Déconnecter</BNav.Link>
            </BNav>
            <BNav.Link as={NavLink} to="/myprofile">
              <Avatar className="profile-avatar" src={`${process.env.REACT_APP_BASE_URL}avatars/${avatar}`} />
            </BNav.Link>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

Nav.propTypes = {
  avatar: PropTypes.string.isRequired,
  isLogged: PropTypes.bool.isRequired,
  unloggedUser: PropTypes.func.isRequired,
};
export default Nav;

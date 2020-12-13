// == Import : npm
import React, { useEffect } from 'react';
import Pages from 'src/containers/Pages';
import PropTypes from 'prop-types';
import Nav from 'src/containers/Nav';
import Footer from 'src/components/Footer';
import axios from 'axios';

// == Import : local
import './app.scss';

// == Composant
const App = ({ loggedUser }) => {
  useEffect(() => {
    const getItem = window.localStorage.getItem('token');
    if (getItem !== null) {
      axios.defaults.headers.Authorization = `Bearer ${getItem}`;
      loggedUser();
    }
  }, []);
  return (
    <div className="app">
      <Nav />
      <Pages />
      <Footer />
    </div>
  );
};

App.propTypes = {
  loggedUser: PropTypes.func.isRequired,
};
// == Export
export default App;

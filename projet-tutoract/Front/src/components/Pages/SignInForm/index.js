import React from 'react';
import { TextField, Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import './signInForm.scss';

const SignInForm = ({
  inputSigninEmail,
  inputSigninPassword,
  changeSigninEmailInput,
  changeSigninPasswordInput,
  sendSubmit,
  setOpen,
  message,
  setClose,
}) => {
  const Alert = (props) => (
    <MuiAlert elevation={6} variant="filled" {...props} />
  );
  const handleClose = () => {
    setClose();
  };
  // Gere l'input de l'email
  const handleSigninEmailOnchange = (evt) => {
    changeSigninEmailInput(evt.target.value, evt.target.name);
  };
  // Gere l'input du password
  const handleSigninPasswordOnChange = (evt) => {
    changeSigninPasswordInput(evt.target.value, evt.target.name);
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    sendSubmit();
  };
  return (
    <div id="signin-container">
      <h1 id="signin-form-title">Connexion</h1>
      <form method="POST" id="signin-form" onSubmit={handleSubmit}>
        <TextField className="formInput" aria-label="signin-email" label="email" type="email" name="username" value={inputSigninEmail} onChange={handleSigninEmailOnchange} />
        <TextField className="formInput" aria-label="signin-password" label="mot de passe" type="password" name="password" value={inputSigninPassword} onChange={handleSigninPasswordOnChange} />
        <Button id="signin-form-button" type="submit" variant="contained" color="primary">
          Envoyer
        </Button>
      </form>
      <Snackbar open={setOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

SignInForm.propTypes = {
  message: PropTypes.string.isRequired,
  setClose: PropTypes.func.isRequired,
  setOpen: PropTypes.bool.isRequired,
  inputSigninEmail: PropTypes.string.isRequired,
  inputSigninPassword: PropTypes.string.isRequired,
  changeSigninEmailInput: PropTypes.func.isRequired,
  changeSigninPasswordInput: PropTypes.func.isRequired,
  sendSubmit: PropTypes.func.isRequired,
};

export default SignInForm;

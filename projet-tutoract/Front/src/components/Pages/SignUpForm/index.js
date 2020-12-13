/* eslint-disable no-return-assign */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  Checkbox,
  FormGroup,
  Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import './signUpForm.scss';

const SignUpForm = ({
  displayTechs,
  displayTechsAtFalse,
  isdisplaytechs,
  inputEmail,
  inputPassword,
  inputConfirmPassword,
  changeEmailInput,
  changePasswordInput,
  handleRoles,
  handleCheck,
  clearCheck,
  sendSubmit,
  getTechs,
  techsData,
  changeConfirmPassword,
  setOpen,
  severity,
  message,
  setClose,
}) => {
  useEffect(() => {
    getTechs();
  }, []);
  // eslint-disable-next-line prefer-const
  const Alert = (props) => (
    <MuiAlert elevation={6} variant="filled" {...props} />
  );
  const handleClose = () => {
    setClose();
  };
  const handleDisplayTechs = (evt) => {
    displayTechs();
    handleRoles(evt.target.value);
  };
  // Réfléchir au renommage des fonctions handleUndisplay et handleDisplay
  const handleUnDisplayTechs = (evt) => {
    displayTechsAtFalse();
    handleRoles(evt.target.value);
  };
  // Gere l'input de l'email
  const handleEmailOnchange = (evt) => {
    // console.log(evt.target.value);
    changeEmailInput(evt.target.value);
  };
  // Gere l'input du password
  const handlePasswordOnChange = (evt) => {
    // console.log(evt.target.value);
    changePasswordInput(evt.target.value);
  };
  const handleConfirmPassword = (evt) => {
    changeConfirmPassword(evt.target.value);
  };
  // Pour Stan => cette fonction marche c'est bon on récup bien la valeur si le check renvoie true.
  const handleTechValue = (evt) => {
    const isCheckedBox = evt.target.checked;
    if (isCheckedBox === true) {
      const techValue = evt.target.value;
      const convertedValue = Number(techValue);
      handleCheck(convertedValue);
    }
    else {
      const techValue = evt.target.value;
      const convertedValue = Number(techValue);
      clearCheck(convertedValue);
    }
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    sendSubmit();
  };

  return (
    <div id="signUpForm">
      <h1 id="formTitle">Inscription</h1>
      <form method="POST" id="formContainer" onSubmit={handleSubmit}>
        <TextField className="formInput" aria-label="email" label="email" type="email" name="email" value={inputEmail} onChange={handleEmailOnchange} />
        <TextField className="formInput" aria-label="mot de passe" label="mot de passe" name="password" type="password" value={inputPassword} onChange={handlePasswordOnChange} />
        <TextField className="formInput" aria-label="mot de passe" label="confirmation mot de passe" name="confirm_password" type="password" value={inputConfirmPassword} onChange={handleConfirmPassword} />
        <p id="formParagraph">Je suis...</p>
        <RadioGroup aria-label="role" className="radioCheckGroup">
          <FormControlLabel value="ROLE_STUDENT" control={<Radio />} aria-label="Elève" label="Elève" name="role" onClick={handleUnDisplayTechs} />
          <FormControlLabel value="ROLE_TUTOR" control={<Radio />} aria-label="Tuteur" label="Tuteur" name="role" onClick={handleDisplayTechs} />
        </RadioGroup>
        { isdisplaytechs && (
          <>
            <p id="formParagraph">Je propose de l'aide pour...</p>
            <FormGroup className="radioCheckGroup">
              {techsData.map((tech) => {
                return (
                  <FormControlLabel
                    control={<Checkbox value={tech.id} name={tech.name} onChange={handleTechValue} />}
                    aria-label={tech.name}
                    label={tech.name}
                    key={tech.name}
                  />
                );
              })}
            </FormGroup>
          </>
        )}
        <Button id="formButton" type="submit" variant="contained" color="primary">
        Envoyer
        </Button>
      </form>
      <Snackbar open={setOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>

    </div>
  );
};

SignUpForm.propTypes = {
  message: PropTypes.string.isRequired,
  setClose: PropTypes.func.isRequired,
  severity: PropTypes.string.isRequired,
  setOpen: PropTypes.bool.isRequired,
  displayTechs: PropTypes.func.isRequired,
  displayTechsAtFalse: PropTypes.func.isRequired,
  isdisplaytechs: PropTypes.bool.isRequired,
  inputEmail: PropTypes.string.isRequired,
  inputPassword: PropTypes.string.isRequired,
  inputConfirmPassword: PropTypes.string.isRequired,
  changeEmailInput: PropTypes.func.isRequired,
  changePasswordInput: PropTypes.func.isRequired,
  changeConfirmPassword: PropTypes.func.isRequired,
  handleRoles: PropTypes.func.isRequired,
  handleCheck: PropTypes.func.isRequired,
  clearCheck: PropTypes.func.isRequired,
  sendSubmit: PropTypes.func.isRequired,
  getTechs: PropTypes.func.isRequired,
  techsData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};


export default SignUpForm;

import { connect } from 'react-redux';
import SignUpForm from 'src/components/Pages/SignUpForm';
import {
  handleEmailInput,
  handlePasswordInput,
  handleConfirmPassword,
  handleSubmit,
  handleDisplayTechs,
  handleDisplayTechsFalse,
  handleRoles,
  handleCheck,
  clearCheck,
  getTechs,
  setClose,
} from '../../../store/reducer/signup';

const mapStateToProps = (state) => ({
  inputEmail: state.signup.inputEmail,
  inputPassword: state.signup.inputPassword,
  isdisplaytechs: state.signup.isdisplaytechs,
  techsData: state.signup.techsData,
  inputConfirmPassword: state.signup.inputConfirmPassword,
  setOpen: state.signup.setOpen,
  severity: state.signup.severity,
  message: state.signup.message,
});

const mapDispatchToProps = (dispatch) => ({
  changeEmailInput: (value) => {
    dispatch(handleEmailInput(value));
  },
  changePasswordInput: (value) => {
    dispatch(handlePasswordInput(value));
  },
  changeConfirmPassword: (value) => {
    dispatch(handleConfirmPassword(value));
  },
  sendSubmit: () => {
    dispatch(handleSubmit());
  },
  displayTechs: () => {
    dispatch(handleDisplayTechs());
  },
  displayTechsAtFalse: () => {
    dispatch(handleDisplayTechsFalse());
  },
  handleRoles: (checkValue) => {
    dispatch(handleRoles(checkValue));
  },
  handleCheck: (checkValue) => {
    dispatch(handleCheck(checkValue));
  },
  clearCheck: (checkValue) => {
    dispatch(clearCheck(checkValue));
  },
  getTechs: () => {
    dispatch(getTechs());
  },
  setClose: () => {
    dispatch(setClose());
  },
});

const SignUpFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpForm);

export default SignUpFormContainer;

import { connect } from 'react-redux';
import SignInForm from 'src/components/Pages/SignInForm';
import { handleSigninEmailInput, handleSigninPasswordInput, handleSubmit, setClose } from '../../../store/reducer/signin';

const mapStateToProps = (state) => ({
  inputSigninEmail: state.signin.inputSigninEmail,
  inputSigninPassword: state.signin.inputSigninPassword,
  setOpen: state.signin.setOpen,
  message: state.signin.message,
});

const mapDispatchToProps = (dispatch) => ({
  changeSigninEmailInput: (value, name) => {
    dispatch(handleSigninEmailInput(value, name));
  },
  changeSigninPasswordInput: (value, name) => {
    dispatch(handleSigninPasswordInput(value, name));
  },
  sendSubmit: () => {
    dispatch(handleSubmit());
  },
  setClose: () => {
    dispatch(setClose());
  },
});

const SignInFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignInForm);

export default SignInFormContainer;

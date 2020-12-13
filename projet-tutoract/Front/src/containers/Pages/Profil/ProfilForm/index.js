import { connect } from 'react-redux';
import ProfilForm from 'src/components/Pages/Profil/ProfilForm';
import { changeCityInput, changeNicknameInput, changeImage, handleSubmit, UploadImage } from 'src/store/reducer/profil';


const mapStateToProps = (state) => ({
  inputCity: state.profil.inputCity,
  inputNickname: state.profil.inputNickname,
});

const mapDispatchToProps = (dispatch) => ({
  changeCityInput: (value) => {
    dispatch(changeCityInput(value));
  },
  changeNicknameInput: (value) => {
    dispatch(changeNicknameInput(value));
  },
  changeImage: (picture) => {
    dispatch(changeImage(picture));
  },
  sendSubmit: () => {
    dispatch(handleSubmit());
  },
  UploadImage: () => {
    dispatch(UploadImage());
  },
});

const ProfilFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfilForm);

export default ProfilFormContainer;

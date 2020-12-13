import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Button } from '@material-ui/core';
import ImageUploader from 'react-images-upload';

import '../profil.scss';

const ProfilForm = ({
  inputNickname,
  inputCity,
  changeCityInput,
  changeNicknameInput,
  changeImage,
  sendSubmit,
  UploadImage,
}) => {
  const handleCityChange = (evt) => {
    const { value } = evt.target;
    changeCityInput(value);
  };
  const handleNicknameChange = (evt) => {
    const { value } = evt.target;
    changeNicknameInput(value);
  };
  const onDrop = (picture) => {
    changeImage(picture[0]);
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    sendSubmit();
    UploadImage();
  };
  return (
    <>
      <h1 className="profile-title">Modifier mes informations</h1>
      <form method="POST" className="profile-form" onSubmit={handleSubmit}>
        <TextField className="formInput" aria-label="Ville" label="Ville" type="string" name="ville" value={inputCity} onChange={handleCityChange} />
        <TextField className="formInput" aria-label="Pseudo" label="Pseudo" name="pseudo" type="string" value={inputNickname} onChange={handleNicknameChange} />
        <ImageUploader
          withIcon={false}
          name="avatar[avatar]"
          buttonText="Choisir un avatar"
          imgExtension={['.jpg', '.png']}
          maxFileSize={5242880}
          label="Max files sizes:5mb, accepted:jpg/png"
          onChange={onDrop}
        />
        <Button className="profile-button" type="submit" variant="contained" color="primary">
              changer mes infos
        </Button>
      </form>
    </>
  );
};

ProfilForm.propTypes = {
  UploadImage: PropTypes.func.isRequired,
  inputNickname: PropTypes.string.isRequired,
  inputCity: PropTypes.string.isRequired,
  changeCityInput: PropTypes.func.isRequired,
  changeNicknameInput: PropTypes.func.isRequired,
  changeImage: PropTypes.func.isRequired,
  sendSubmit: PropTypes.func.isRequired,
};

export default ProfilForm;

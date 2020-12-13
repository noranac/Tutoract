import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import './user.scss';

const UserMessenger = ({ owner, users }) => {
  return (
    <div className="user">
      <Avatar className="user-avatar" src={`${process.env.REACT_APP_BASE_URL}${owner.avatar_url}`} />
      <div className="user-tutor">
        <h3 className="user-name">{owner.lastname} {owner.firstname}</h3>
      </div>
      <ul className="user-students">
        {users.map((user) => (
          <div key={user.id}>
            <Avatar className="user-avatar" src={`${process.env.REACT_APP_BASE_URL}${user.avatar_url}`} />
            <div className="user-student">
              <li>{user.firstname} {user.lastname}</li>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

UserMessenger.propTypes = {
  owner: PropTypes.shape({
    lastname: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
  }).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      lastname: PropTypes.string.isRequired,
      firstname: PropTypes.string.isRequired,
      avatar_url: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default UserMessenger;

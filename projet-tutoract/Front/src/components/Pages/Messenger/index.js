import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import Message from 'src/containers/Pages/Messenger/Message';
import UserMessenger from './User';
import './messenger.scss';

const Messenger = ({ eventRedirectOff, getInfoEvent, owner, users, tech, description, content, sendContent, submitContent }) => {
  useEffect(() => {
    eventRedirectOff();
    getInfoEvent();
  }, []);
  const handleInput = (evt) => {
    const { value } = evt.target;
    sendContent(value);
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    submitContent();
  };
  return (
    <div className="messenger">
      <div className="messenger-box">
        <h1 className="messenger-title">Cours {tech.name}</h1>
        <div className="messenger-container">
          <div className="messenger-chat">
            <div className="messenger-messages">
              <Message />
            </div>
            <div className="messenger-profil">
              <div className="messenger-topic">
                <h2 className="messenger-description">Sujet: {description}</h2>
              </div>
              <div className="messenger-users">
                <UserMessenger owner={owner} users={users} />
              </div>
            </div>
          </div>
          <div className="messenger-infos">
            <form className="messenger-form" onSubmit={handleSubmit}>
              <TextField label="Mon message..." variant="filled" className="messenger-input" type="text" value={content} onChange={handleInput} />
              <button className="messenger-button" type="submit">
                <SendIcon className="messenger-icon" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Messenger.propTypes = {
  submitContent: PropTypes.func.isRequired,
  getInfoEvent: PropTypes.func.isRequired,
  sendContent: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  eventRedirectOff: PropTypes.func.isRequired,
  owner: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  description: PropTypes.string.isRequired,
  tech: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Messenger;

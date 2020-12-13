import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PropTypes from 'prop-types';
import moment from 'moment';
import './event.scss';
import { getContent } from '../../../../store/reducer/message';

const MyEvent = ({ toggleSettings, isOpen, events, sendInfos, sendSubmit, getContent }) => {
  const setToggle = () => {
    toggleSettings();
  };
  const handleOnClick = (eventId, techName) => {
    console.log(eventId, techName);
    sendInfos(eventId, techName);
    getContent();
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log('je suis le submit du event');
    sendSubmit();
  };
  return (
    <div className="event">
      <FormControlLabel
        className="event-label"
        control={<Switch checked={isOpen} onChange={setToggle} />}
        label="Mes Evenements"
      />
      <div className="event-collapse">
        <Collapse in={isOpen}>
          <div className="event-box">
            <h1 className="event-toggle">Mes Evenements</h1>
            <div className="event-cards">
              {events.map((event) => (
                <Card key={event.id} className="event-card">
                  <form method="POST" onSubmit={handleSubmit}>
                    <CardActionArea className="event-card-center" type="submit" onClick={() => {handleOnClick(event.id, event.tech.name)}}>
                      <CardContent>
                        <Typography className="event-title" gutterBottom variant="h5" component="h2">
                          {event.tech.name}
                        </Typography>
                        <Typography className="event-date" variant="body2" color="textSecondary" component="p">
                        Date: {moment(event.date).subtract(2, 'hours').locale('fr').format('llll')}
                        </Typography>
                        <Typography className="event-description" variant="body2" color="textSecondary" component="p">
                          Description: {event.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </form>
                </Card>
              ))}
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
};

MyEvent.propTypes = {
  getContent: PropTypes.func.isRequired,
  sendInfos: PropTypes.func.isRequired,
  toggleSettings: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      tech: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
};

export default MyEvent;

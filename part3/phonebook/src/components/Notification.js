import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ style, message }) => {
  if (!message) {
    return null;
  }

  return <div className={`noti ${style}`}>{message}</div>;
};

Notification.propTypes = {
  style: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};
export default Notification;

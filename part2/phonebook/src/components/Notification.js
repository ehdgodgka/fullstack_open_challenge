import React from "react";
const Notification = ({ style, message }) => {
  if (!message) {
    return null;
  }

  return <div className={`noti ${style}`}>{message}</div>;
};
export default Notification;

import React, { useContext } from "react";

import NotificationContext from "../../store/notification-context";

import classes from "./notification.module.css";

const Notification = ({ title, message, status }) => {
  const { hideNotification } = useContext(NotificationContext);

  let statusClasses = "";

  switch (status) {
    case "success":
      statusClasses = classes.success;
      break;
    case "error":
      statusClasses = classes.error;
      break;
    case "pending":
      statusClasses = classes.pending;
      break;
    default:
      break;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default Notification;

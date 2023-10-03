import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import "./Notification.scss";

const Notification = ({
  message,
  type = "success",
  duration = 3000,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) {
        onClose();
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return visible && <div className={`notification ${type}`}>{message}</div>;
};

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
  duration: PropTypes.number,
  onClose: PropTypes.func,
};

export default Notification;

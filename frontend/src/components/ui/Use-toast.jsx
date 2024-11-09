import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const ToastMessage = ({
  message,
  type = "success",
  duration = 3000,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  const toastStyles = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
  };

  return (
    <div
      className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-md text-white shadow-md ${toastStyles[type]} transition-all`}
    >
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button
          onClick={() => setVisible(false)}
          className="ml-3 text-lg font-bold"
        >
          ×
        </button>
      </div>
    </div>
  );
};

ToastMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error", "info", "warning"]),
  duration: PropTypes.number,
  onClose: PropTypes.func,
};

export default ToastMessage;

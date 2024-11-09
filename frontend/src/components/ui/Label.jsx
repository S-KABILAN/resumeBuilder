import PropTypes from "prop-types";

const Label = ({ text, htmlFor, className = "" }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-gray-700 font-medium ${className}`}
    >
      {text}
    </label>
  );
};

Label.propTypes = {
  text: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Label;

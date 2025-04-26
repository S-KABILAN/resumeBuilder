import React from "react";
import PropTypes from "prop-types";

// Basic Input component
export const Input = ({ value, onChange, placeholder, className, ...rest }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
        className || ""
      }`}
      {...rest}
    />
  );
};

// Basic Select component
export const Select = ({ value, onChange, children, className, ...rest }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`w-full rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
        className || ""
      }`}
      {...rest}
    >
      {children}
    </select>
  );
};

// Basic Checkbox component
export const Checkbox = ({ id, checked, onChange, ...rest }) => {
  return (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
      {...rest}
    />
  );
};

// PropTypes
Input.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

Select.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Checkbox.propTypes = {
  id: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default {
  Input,
  Select,
  Checkbox,
};

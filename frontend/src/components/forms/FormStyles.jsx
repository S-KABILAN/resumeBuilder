import React from "react";
import PropTypes from "prop-types";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

// Compact form container
export const FormContainer = ({ children, title }) => (
  <div className="space-y-3">
    {title && (
      <h2 className="text-lg font-medium text-gray-800 mb-2">{title}</h2>
    )}
    {children}
  </div>
);

// Form section with optional title
export const FormSection = ({ children, title, description }) => (
  <div className="mb-3">
    {title && (
      <div className="flex items-center mb-1">
        <h3 className="text-sm font-medium text-gray-800">{title}</h3>
      </div>
    )}
    {description && <p className="text-xs text-gray-500 mb-2">{description}</p>}
    <div className="space-y-2">{children}</div>
  </div>
);

// Compact form grid - for multiple inputs in a row
export const FormGrid = ({ children, columns = 2 }) => (
  <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-3`}>
    {children}
  </div>
);

// Input field with validation
export const FormField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required = false,
  icon,
  helpText,
  className = "",
}) => {
  const hasContent = value && value.trim() !== "";

  return (
    <div className={`relative ${className}`}>
      <label
        htmlFor={name}
        className="block text-xs font-medium text-gray-700 mb-1 flex items-center"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
        {hasContent && !error && (
          <FaCheckCircle className="ml-1 text-green-500" size={10} />
        )}
      </label>
      <div className="relative rounded-md shadow-sm">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          id={name}
          name={name}
          value={value || ""}
          onChange={onChange}
          className={`w-full ${
            icon ? "pl-7" : "pl-2.5"
          } pr-2.5 py-1.5 text-xs border ${
            error
              ? "border-red-300 focus:ring-red-500"
              : hasContent
              ? "border-green-300 focus:ring-green-500"
              : "border-gray-300 focus:ring-indigo-500"
          } rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors`}
          placeholder={placeholder}
          required={required}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
            <FaExclamationCircle className="text-red-500" size={12} />
          </div>
        )}
      </div>
      {error ? (
        <p className="mt-0.5 text-xs text-red-500">{error}</p>
      ) : helpText ? (
        <p className="mt-0.5 text-xs text-gray-500">{helpText}</p>
      ) : null}
    </div>
  );
};

// Textarea field with validation
export const FormTextArea = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  rows = 2,
  helpText,
  className = "",
}) => {
  const hasContent = value && value.trim() !== "";

  return (
    <div className={`relative ${className}`}>
      <label
        htmlFor={name}
        className="block text-xs font-medium text-gray-700 mb-1 flex items-center"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
        {hasContent && !error && (
          <FaCheckCircle className="ml-1 text-green-500" size={10} />
        )}
      </label>
      <textarea
        id={name}
        name={name}
        value={value || ""}
        onChange={onChange}
        rows={rows}
        className={`w-full px-2.5 py-1.5 text-xs border ${
          error
            ? "border-red-300 focus:ring-red-500"
            : hasContent
            ? "border-green-300 focus:ring-green-500"
            : "border-gray-300 focus:ring-indigo-500"
        } rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors`}
        placeholder={placeholder}
        required={required}
      />
      {error ? (
        <p className="mt-0.5 text-xs text-red-500">{error}</p>
      ) : helpText ? (
        <p className="mt-0.5 text-xs text-gray-500">{helpText}</p>
      ) : null}
    </div>
  );
};

// Checkbox field
export const FormCheckbox = ({ label, name, checked, onChange, helpText }) => (
  <div className="flex items-center">
    <input
      type="checkbox"
      id={name}
      name={name}
      checked={checked || false}
      onChange={onChange}
      className="h-3.5 w-3.5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
    />
    <label htmlFor={name} className="ml-2 text-xs text-gray-700">
      {label}
    </label>
    {helpText && <span className="ml-1 text-xs text-gray-500">{helpText}</span>}
  </div>
);

// Compact entry tabs for multiple items (like multiple education entries)
export const EntryTabs = ({
  entries,
  activeIndex,
  setActiveIndex,
  onAdd,
  onRemove,
  disableRemove = false,
  addButtonLabel = "Add",
  addButtonIcon = <FaPlus size={10} />,
}) => (
  <div className="flex flex-wrap gap-1 mb-3">
    {entries.map((_, index) => (
      <button
        key={index}
        type="button"
        onClick={() => setActiveIndex(index)}
        className={`px-2 py-1 text-xs rounded-md ${
          activeIndex === index
            ? "bg-indigo-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        {index + 1}
      </button>
    ))}
    <button
      type="button"
      onClick={onAdd}
      className="px-2 py-1 text-xs rounded-md bg-indigo-100 text-indigo-700 hover:bg-indigo-200 flex items-center gap-1"
      title={addButtonLabel}
    >
      {addButtonIcon}
      <span className="hidden sm:inline">{addButtonLabel}</span>
    </button>
  </div>
);

// Entry card for each item in a form (education entry, experience entry, etc.)
export const EntryCard = ({
  children,
  title,
  onRemove,
  disableRemove = false,
  isVisible = true,
  onVisibilityChange,
}) => (
  <div className="bg-white p-3 rounded-md border border-gray-200 shadow-sm">
    <div className="flex justify-between items-center mb-2">
      <h4 className="text-sm font-medium text-gray-700">{title}</h4>
      <div className="flex items-center space-x-3">
        {onVisibilityChange && (
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={isVisible}
              onChange={onVisibilityChange}
              className="h-3 w-3 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
            />
            <span className="ml-1 text-xs text-gray-600">Show</span>
          </label>
        )}
        {!disableRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-red-500 hover:text-red-700 focus:outline-none"
            title="Remove entry"
          >
            <FaTrash size={10} />
          </button>
        )}
      </div>
    </div>
    <div>{children}</div>
  </div>
);

// Form footer with submit button and optional secondary action
export const FormFooter = ({
  onSubmit,
  submitText = "Save Changes",
  secondaryAction,
}) => (
  <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
    {secondaryAction}
    <button
      type="button"
      onClick={onSubmit}
      className="px-3 py-1.5 text-xs bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
    >
      {submitText}
    </button>
  </div>
);

// PropTypes
FormContainer.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

FormSection.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
};

FormGrid.propTypes = {
  children: PropTypes.node.isRequired,
  columns: PropTypes.number,
};

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  icon: PropTypes.node,
  helpText: PropTypes.string,
  className: PropTypes.string,
};

FormTextArea.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  rows: PropTypes.number,
  helpText: PropTypes.string,
  className: PropTypes.string,
};

FormCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  helpText: PropTypes.string,
};

EntryTabs.propTypes = {
  entries: PropTypes.array.isRequired,
  activeIndex: PropTypes.number.isRequired,
  setActiveIndex: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
  disableRemove: PropTypes.bool,
  addButtonLabel: PropTypes.string,
  addButtonIcon: PropTypes.node,
};

EntryCard.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  onRemove: PropTypes.func,
  disableRemove: PropTypes.bool,
  isVisible: PropTypes.bool,
  onVisibilityChange: PropTypes.func,
};

FormFooter.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string,
  secondaryAction: PropTypes.node,
};

export default {
  FormContainer,
  FormSection,
  FormGrid,
  FormField,
  FormTextArea,
  FormCheckbox,
  EntryTabs,
  EntryCard,
  FormFooter,
};

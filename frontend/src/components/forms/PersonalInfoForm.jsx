import React from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

const InputField = ({
  icon: Icon,
  label,
  type,
  value,
  onChange,
  placeholder,
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
      />
    </div>
  </div>
);

const PersonalInfoForm = ({ formData, onFormChange, onSubmit }) => {
  return (
    <div className="bg-white shadow-sm rounded-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Personal Information
      </h2>

      <InputField
        icon={FaUser}
        label="Name"
        type="text"
        value={formData.name}
        onChange={(e) => onFormChange("name", e.target.value)}
        placeholder="Enter your name"
      />

      <InputField
        icon={FaEnvelope}
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => onFormChange("email", e.target.value)}
        placeholder="Enter your email"
      />

      <InputField
        icon={FaPhone}
        label="Phone"
        type="tel"
        value={formData.phone}
        onChange={(e) => onFormChange("phone", e.target.value)}
        placeholder="Enter your phone number"
      />

      <InputField
        icon={FaMapMarkerAlt}
        label="Location"
        type="text"
        value={formData.location}
        onChange={(e) => onFormChange("location", e.target.value)}
        placeholder="Enter your location"
      />

      <InputField
        icon={FaLinkedin}
        label="LinkedIn"
        type="url"
        value={formData.linkedin}
        onChange={(e) => onFormChange("linkedin", e.target.value)}
        placeholder="Enter your LinkedIn URL"
      />

      <InputField
        icon={FaGithub}
        label="GitHub"
        type="url"
        value={formData.github}
        onChange={(e) => onFormChange("github", e.target.value)}
        placeholder="Enter your GitHub URL"
      />

      <button
        type="button"
        onClick={onSubmit}
        className="mt-6 w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
      >
        Save Personal Information
      </button>
    </div>
  );
};

export default PersonalInfoForm;

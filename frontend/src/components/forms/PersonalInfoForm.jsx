import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGlobe,
  FaLinkedin,
  FaGithub,
  FaBriefcase,
  FaInfoCircle,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

const PersonalInfoForm = ({ formData, onFormChange, errors = {} }) => {
  const [activeSection, setActiveSection] = useState("basic"); // 'basic' or 'social' or 'professional'

  const handleChange = (e) => {
    const { name, value } = e.target;
    onFormChange(name, value);
  };

  // Helper function to check if a field has content
  const hasContent = (fieldName) => {
    return formData[fieldName] && formData[fieldName].trim() !== "";
  };

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-4">
        <button
          onClick={() => setActiveSection("basic")}
          className={`py-2 px-3 text-xs font-medium border-b-2 transition-colors flex items-center ${
            activeSection === "basic"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          <FaUser className="mr-1.5" size={11} /> Basic Info
        </button>
        <button
          onClick={() => setActiveSection("social")}
          className={`py-2 px-3 text-xs font-medium border-b-2 transition-colors flex items-center ${
            activeSection === "social"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          <FaGlobe className="mr-1.5" size={11} /> Web & Social
        </button>
        <button
          onClick={() => setActiveSection("professional")}
          className={`py-2 px-3 text-xs font-medium border-b-2 transition-colors flex items-center ${
            activeSection === "professional"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          <FaBriefcase className="mr-1.5" size={11} /> Professional
        </button>
      </div>

      {/* Basic Information Section */}
      {activeSection === "basic" && (
        <div className="space-y-3">
          <div className="mb-3">
            <div className="flex items-center mb-2">
              <div className="bg-indigo-100 rounded-full p-1 mr-2">
                <FaUser className="text-indigo-600" size={11} />
              </div>
              <h3 className="text-sm font-medium text-gray-800">
                Basic Information
              </h3>
            </div>
            <p className="text-xs text-gray-500">
              Add your personal details that will appear at the top of your
              resume. <span className="text-red-500">*</span> Required fields
            </p>
          </div>

          {/* Name Field */}
          <div className="relative">
            <label
              htmlFor="name"
              className="block text-xs font-medium text-gray-700 mb-1 flex items-center"
            >
              Full Name <span className="text-red-500 ml-1">*</span>
              {hasContent("name") && (
                <FaCheckCircle className="ml-1.5 text-green-500" size={11} />
              )}
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" size={11} />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                className={`w-full pl-8 pr-3 py-1.5 text-sm border ${
                  errors && errors["personal.name"]
                    ? "border-red-500 focus:ring-red-500"
                    : hasContent("name")
                    ? "border-green-300 focus:ring-green-500"
                    : "border-gray-300 focus:ring-indigo-500"
                } rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors`}
                placeholder="e.g. John Doe"
                required
              />
              {errors && errors["personal.name"] && (
                <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center">
                  <FaExclamationCircle className="text-red-500" size={13} />
                </div>
              )}
            </div>
            {errors && errors["personal.name"] && (
              <p className="mt-1 text-xs text-red-500">
                {errors["personal.name"]}
              </p>
            )}
          </div>

          {/* Email and Phone Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Email Field */}
            <div className="relative">
              <label
                htmlFor="email"
                className="block text-xs font-medium text-gray-700 mb-1 flex items-center"
              >
                Email <span className="text-red-500 ml-1">*</span>
                {hasContent("email") && (
                  <FaCheckCircle className="ml-1.5 text-green-500" size={11} />
                )}
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" size={11} />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  className={`w-full pl-8 pr-3 py-1.5 text-sm border ${
                    errors && errors["personal.email"]
                      ? "border-red-500 focus:ring-red-500"
                      : hasContent("email")
                      ? "border-green-300 focus:ring-green-500"
                      : "border-gray-300 focus:ring-indigo-500"
                  } rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors`}
                  placeholder="e.g. john.doe@example.com"
                  required
                />
                {errors && errors["personal.email"] && (
                  <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center">
                    <FaExclamationCircle className="text-red-500" size={13} />
                  </div>
                )}
              </div>
              {errors && errors["personal.email"] && (
                <p className="mt-0.5 text-xs text-red-500">
                  {errors["personal.email"]}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div className="relative">
              <label
                htmlFor="phone"
                className="block text-xs font-medium text-gray-700 mb-1 flex items-center"
              >
                Phone <span className="text-red-500 ml-1">*</span>
                {hasContent("phone") && (
                  <FaCheckCircle className="ml-1.5 text-green-500" size={11} />
                )}
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                  <FaPhone className="text-gray-400" size={11} />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone || ""}
                  onChange={handleChange}
                  className={`w-full pl-8 pr-3 py-1.5 text-sm border ${
                    errors && errors["personal.phone"]
                      ? "border-red-500 focus:ring-red-500"
                      : hasContent("phone")
                      ? "border-green-300 focus:ring-green-500"
                      : "border-gray-300 focus:ring-indigo-500"
                  } rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors`}
                  placeholder="e.g. (555) 123-4567"
                  required
                />
                {errors && errors["personal.phone"] && (
                  <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center">
                    <FaExclamationCircle className="text-red-500" size={13} />
                  </div>
                )}
              </div>
              {errors && errors["personal.phone"] && (
                <p className="mt-0.5 text-xs text-red-500">
                  {errors["personal.phone"]}
                </p>
              )}
            </div>
          </div>

          {/* Location Field */}
          <div className="relative">
            <label
              htmlFor="location"
              className="block text-xs font-medium text-gray-700 mb-1 flex items-center"
            >
              Location
              {hasContent("location") && (
                <span className="ml-1.5 text-xs bg-green-100 text-green-700 py-0 px-1.5 rounded text-[10px]">
                  Recommended
                </span>
              )}
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                <FaMapMarkerAlt className="text-gray-400" size={11} />
              </div>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location || ""}
                onChange={handleChange}
                className={`w-full pl-8 pr-3 py-1.5 text-sm border ${
                  hasContent("location")
                    ? "border-green-300 focus:ring-green-500"
                    : "border-gray-300 focus:ring-indigo-500"
                } rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors`}
                placeholder="e.g. New York, NY"
              />
            </div>
            <p className="mt-0.5 text-[10px] text-gray-500">
              City, State/Province, Country
            </p>
          </div>
        </div>
      )}

      {/* Web & Social Section */}
      {activeSection === "social" && (
        <div className="space-y-3">
          <div className="mb-3">
            <div className="flex items-center mb-2">
              <div className="bg-blue-100 rounded-full p-1 mr-2">
                <FaGlobe className="text-blue-600" size={11} />
              </div>
              <h3 className="text-sm font-medium text-gray-800">
                Web & Social Media
              </h3>
            </div>
            <p className="text-xs text-gray-500">
              Add your web presence to make it easy for employers to learn more
              about you.
            </p>
          </div>

          {/* Website URL */}
          <div className="relative">
            <label
              htmlFor="website"
              className="block text-xs font-medium text-gray-700 mb-1 flex items-center"
            >
              Personal Website
              {hasContent("website") && (
                <FaCheckCircle className="ml-1.5 text-green-500" size={11} />
              )}
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                <FaGlobe className="text-gray-400" size={11} />
              </div>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website || ""}
                onChange={handleChange}
                className={`w-full pl-8 pr-3 py-1.5 text-sm border ${
                  hasContent("website")
                    ? "border-green-300 focus:ring-green-500"
                    : "border-gray-300 focus:ring-indigo-500"
                } rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors`}
                placeholder="e.g. https://johndoe.com"
              />
            </div>
            <p className="mt-0.5 text-[10px] text-gray-500">
              Include the full URL including https://
            </p>
          </div>

          {/* LinkedIn Profile */}
          <div className="relative">
            <label
              htmlFor="linkedin"
              className="block text-xs font-medium text-gray-700 mb-1 flex items-center"
            >
              LinkedIn Profile
              {hasContent("linkedin") && (
                <FaCheckCircle className="ml-1.5 text-green-500" size={11} />
              )}
              <span className="ml-1.5 text-xs bg-blue-100 text-blue-700 py-0 px-1.5 rounded text-[10px]">
                Recommended
              </span>
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                <FaLinkedin className="text-gray-400" size={11} />
              </div>
              <input
                type="url"
                id="linkedin"
                name="linkedin"
                value={formData.linkedin || ""}
                onChange={handleChange}
                className={`w-full pl-8 pr-3 py-1.5 text-sm border ${
                  hasContent("linkedin")
                    ? "border-green-300 focus:ring-green-500"
                    : "border-gray-300 focus:ring-indigo-500"
                } rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors`}
                placeholder="e.g. https://linkedin.com/in/johndoe"
              />
            </div>
          </div>

          {/* GitHub Profile */}
          <div className="relative">
            <label
              htmlFor="github"
              className="block text-xs font-medium text-gray-700 mb-1 flex items-center"
            >
              GitHub Profile
              {hasContent("github") && (
                <FaCheckCircle className="ml-1.5 text-green-500" size={11} />
              )}
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                <FaGithub className="text-gray-400" size={11} />
              </div>
              <input
                type="url"
                id="github"
                name="github"
                value={formData.github || ""}
                onChange={handleChange}
                className={`w-full pl-8 pr-3 py-1.5 text-sm border ${
                  hasContent("github")
                    ? "border-green-300 focus:ring-green-500"
                    : "border-gray-300 focus:ring-indigo-500"
                } rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors`}
                placeholder="e.g. https://github.com/johndoe"
              />
            </div>
          </div>
        </div>
      )}

      {/* Professional Section */}
      {activeSection === "professional" && (
        <div className="space-y-3">
          <div className="mb-3">
            <div className="flex items-center mb-2">
              <div className="bg-purple-100 rounded-full p-1 mr-2">
                <FaBriefcase className="text-purple-600" size={11} />
              </div>
              <h3 className="text-sm font-medium text-gray-800">
                Professional Details
              </h3>
            </div>
            <p className="text-xs text-gray-500">
              Add information about your professional identity and career
              summary.
            </p>
          </div>

          {/* Job Title Field */}
          <div className="relative">
            <label
              htmlFor="title"
              className="block text-xs font-medium text-gray-700 mb-1 flex items-center"
            >
              Professional Title
              {hasContent("title") && (
                <FaCheckCircle className="ml-1.5 text-green-500" size={11} />
              )}
              <span className="ml-1.5 text-xs bg-blue-100 text-blue-700 py-0 px-1.5 rounded text-[10px]">
                Recommended
              </span>
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                <FaBriefcase className="text-gray-400" size={11} />
              </div>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title || ""}
                onChange={handleChange}
                className={`w-full pl-8 pr-3 py-1.5 text-sm border ${
                  hasContent("title")
                    ? "border-green-300 focus:ring-green-500"
                    : "border-gray-300 focus:ring-indigo-500"
                } rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors`}
                placeholder="e.g. Frontend Developer"
              />
            </div>
            <p className="mt-0.5 text-[10px] text-gray-500">
              Your current or desired job title
            </p>
          </div>

          {/* Summary Field */}
          <div className="relative">
            <div className="flex justify-between items-center mb-1">
              <label
                htmlFor="objective"
                className="block text-xs font-medium text-gray-700 flex items-center"
              >
                Career Objective/Summary
                {hasContent("objective") && (
                  <FaCheckCircle className="ml-1.5 text-green-500" size={11} />
                )}
              </label>
              <div className="flex items-center text-gray-500 text-[10px]">
                <FaInfoCircle className="mr-1" size={10} />
                <span>Optional but recommended</span>
              </div>
            </div>
            <textarea
              id="objective"
              name="objective"
              value={formData.objective || ""}
              onChange={handleChange}
              rows="2"
              className={`w-full px-2.5 py-1.5 text-sm border ${
                hasContent("objective")
                  ? "border-green-300 focus:ring-green-500"
                  : "border-gray-300 focus:ring-indigo-500"
              } rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors`}
              placeholder="Briefly describe your career goals and professional expertise..."
            ></textarea>
            <p className="mt-0.5 text-[10px] text-gray-500 flex items-start">
              <FaInfoCircle className="text-gray-400 mr-1 mt-0.5" size={9} />
              <span>
                Keep it concise (3-5 sentences). Focus on key skills &
                experience.
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="pt-3 flex justify-between border-t border-gray-100 mt-4">
        {activeSection === "basic" ? (
          <div></div> // Empty div to maintain spacing
        ) : (
          <button
            type="button"
            onClick={() =>
              setActiveSection(activeSection === "social" ? "basic" : "social")
            }
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-xs"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {activeSection === "social"
              ? "Back to Basic Info"
              : "Back to Web & Social"}
          </button>
        )}

        {activeSection === "professional" ? (
          <div></div> // Empty div to maintain spacing
        ) : (
          <button
            type="button"
            onClick={() =>
              setActiveSection(
                activeSection === "basic" ? "social" : "professional"
              )
            }
            className="flex items-center bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors px-3 py-1.5 rounded text-xs"
          >
            {activeSection === "basic"
              ? "Continue to Web & Social"
              : "Continue to Professional Details"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

PersonalInfoForm.propTypes = {
  formData: PropTypes.object.isRequired,
  onFormChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

export default PersonalInfoForm;

import React from "react";
import PropTypes from "prop-types";

const PersonalInfoForm = ({ formData, onFormChange, errors = {} }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFormChange(name, value);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Personal Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name Field */}
        <div className="col-span-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors && errors["personal.name"]
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="e.g. John Doe"
            required
          />
          {errors && errors["personal.name"] && (
            <p className="mt-1 text-xs text-red-500">
              {errors["personal.name"]}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors && errors["personal.email"]
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="e.g. john.doe@example.com"
            required
          />
          {errors && errors["personal.email"] && (
            <p className="mt-1 text-xs text-red-500">
              {errors["personal.email"]}
            </p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors && errors["personal.phone"]
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="e.g. (555) 123-4567"
            required
          />
          {errors && errors["personal.phone"] && (
            <p className="mt-1 text-xs text-red-500">
              {errors["personal.phone"]}
            </p>
          )}
        </div>

        {/* Address Field */}
        <div className="col-span-2">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 123 Main St, City, State, ZIP"
          />
        </div>

        {/* Website Field */}
        <div>
          <label
            htmlFor="website"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Website
          </label>
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. https://johndoe.com"
          />
        </div>

        {/* LinkedIn Field */}
        <div>
          <label
            htmlFor="linkedin"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            LinkedIn
          </label>
          <input
            type="url"
            id="linkedin"
            name="linkedin"
            value={formData.linkedin || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. https://linkedin.com/in/johndoe"
          />
        </div>
        {/* Github Field */}
        <div>
          <label
            htmlFor="github"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            GitHub
          </label>
          <input
            type="url"
            id="github"
            name="github"
            value={formData.github || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. https://github.com/S-KABILAN"
          />
        </div>

        {/* Job Title Field */}
        <div className="col-span-2">
          <label
            htmlFor="jobTitle"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Professional Title
          </label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Senior Software Engineer"
          />
        </div>

        {/* Summary Field */}
        <div className="col-span-2">
          <label
            htmlFor="summary"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Professional Summary
          </label>
          <textarea
            id="summary"
            name="summary"
            value={formData.summary || ""}
            onChange={handleChange}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Brief summary of your professional background and key qualifications..."
          ></textarea>
          <p className="mt-1 text-xs text-gray-500">
            Provide a concise summary of your professional experience, skills,
            and career goals. Keep it between 3-5 sentences.
          </p>
        </div>

        {/* Additional Contact Fields - Optional Section */}
        <div className="col-span-2 mt-4">
          <details className="group">
            <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
              <span className="text-sm font-medium text-gray-700">
                Additional Contact Info
              </span>
              <span className="transition group-open:rotate-180">
                <svg
                  fill="none"
                  height="24"
                  shapeRendering="geometricPrecision"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </summary>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* GitHub Field */}
              <div>
                <label
                  htmlFor="github"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  GitHub
                </label>
                <input
                  type="url"
                  id="github"
                  name="github"
                  value={formData.github || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. https://github.com/johndoe"
                />
              </div>

              {/* Twitter/X Field */}
              <div>
                <label
                  htmlFor="twitter"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Twitter/X
                </label>
                <input
                  type="url"
                  id="twitter"
                  name="twitter"
                  value={formData.twitter || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. https://twitter.com/johndoe"
                />
              </div>

              {/* Portfolio Field */}
              <div>
                <label
                  htmlFor="portfolio"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Portfolio
                </label>
                <input
                  type="url"
                  id="portfolio"
                  name="portfolio"
                  value={formData.portfolio || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. https://myportfolio.com"
                />
              </div>

              {/* Other Social Field */}
              <div>
                <label
                  htmlFor="otherSocial"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Other Social
                </label>
                <input
                  type="url"
                  id="otherSocial"
                  name="otherSocial"
                  value={formData.otherSocial || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. https://medium.com/@johndoe"
                />
              </div>
            </div>
          </details>
        </div>
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

import React, { useState } from "react";
import { ResumeDownloadButton, ResumeViewer } from "./ReactPDFResume";
import { FaDownload, FaEye, FaEyeSlash } from "react-icons/fa";

const ResumeDownload = ({
  formData,
  templateSettings,
  selectedLayout,
  sectionConfig = [],
}) => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="card bg-white p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Resume Download</h2>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="flex items-center text-indigo-600 hover:text-indigo-800"
        >
          {showPreview ? (
            <>
              <FaEyeSlash className="mr-2" /> Hide Preview
            </>
          ) : (
            <>
              <FaEye className="mr-2" /> Show Preview
            </>
          )}
        </button>
      </div>

      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          Generate your resume as a high-quality, professionally formatted PDF
          document that's perfect for job applications.
        </p>
        <div className="flex justify-center">
          <ResumeDownloadButton
            formData={formData}
            templateSettings={templateSettings}
            selectedLayout={selectedLayout}
            sectionConfig={sectionConfig}
          />
        </div>
      </div>

      {showPreview && (
        <div className="mt-6 border-t pt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Resume Preview
          </h3>
          <div
            className={`border border-gray-300 rounded-md overflow-hidden resume-container content-spacing-${templateSettings.contentSpacing} font-size-${templateSettings.fontSize}`}
          >
            <div className="resume-content">
              <ResumeViewer
                formData={formData}
                templateSettings={templateSettings}
                selectedLayout={selectedLayout}
                sectionConfig={sectionConfig}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeDownload;

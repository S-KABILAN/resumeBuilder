import React, { useState } from "react";
import Layout1Preview from "../assets/resume1.png"; // Example image paths
import Layout2Preview from "../assets/resume2.png";

const ResumeTemplates = ({ onSelectTemplate, formData }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const templates = [
    {
      id: "Layout1",
      name: "Modern Clean",
      image: Layout1Preview,
    },
    {
      id: "Layout2",
      name: "Professional Classic",
      image: Layout2Preview,
    },
  ];

  const handleSelectTemplate = (templateId) => {
    const template = templates.find((t) => t.id === templateId);
    setSelectedTemplate(template);
    onSelectTemplate(templateId);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 h-screen flex flex-col items-center justify-center ">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Choose Your Resume Template
      </h2>

      {selectedTemplate ? (
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-gray-700 mb-6">
            You Selected: {selectedTemplate.name}
          </h3>
          <img
            src={selectedTemplate.image}
            alt={`${selectedTemplate.name} preview`}
            className="w-full max-w-md mx-auto rounded-md shadow-lg border"
          />
          <p className="mt-4 text-gray-600">
            Redirecting to customize your resume...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-200"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  {template.name}
                </h3>
                <div className="border rounded-md overflow-hidden mb-6 mx-auto">
                  <img
                    src={template.image}
                    alt={`${template.name} preview`}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <button
                  onClick={() => handleSelectTemplate(template.id)}
                  className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
                >
                  Select Template
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumeTemplates;

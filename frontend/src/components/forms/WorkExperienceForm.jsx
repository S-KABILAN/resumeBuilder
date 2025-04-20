import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { FaTrash, FaPlus, FaGripLines } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

const WorkExperienceForm = ({
  items = [],
  onItemAdd,
  onItemUpdate,
  onItemRemove,
  onItemReorder,
  errors = {},
}) => {
  // Add a default work experience entry if none exist
  useEffect(() => {
    if (!items || items.length === 0) {
      const defaultWorkExperience = {
        id: uuidv4(),
        company: "Tech Innovations Inc.",
        role: "Software Developer",
        location: "San Francisco, CA",
        startDate: "2022-06",
        endDate: "",
        isCurrentlyWorking: true,
        description:
          "• Developed and maintained web applications using React, Node.js, and MongoDB\n• Improved application performance by 30% through code optimization and implementing best practices\n• Collaborated with cross-functional teams to implement new features and resolve critical bugs\n• Participated in code reviews and mentored junior developers",
        isVisible: true,
      };
      onItemAdd(defaultWorkExperience);
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Work experience entries */}
      <div className="space-y-6">
        {!items || items.length === 0 ? (
          <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 text-center">
            <p className="text-gray-500">Loading work experience entries...</p>
          </div>
        ) : (
          items.map((experience, index) => (
            <div
              key={experience.id || index}
              className="p-6 bg-white rounded-lg border border-gray-200"
              data-draggable-id={`experience-${index}`}
            >
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={experience.isVisible || false}
                    onChange={(e) =>
                      handleVisibilityChange(index, e.target.checked)
                    }
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Show</span>
                </label>
                <button
                  type="button"
                  onClick={() => onItemRemove(index)}
                  className="text-red-500 hover:text-red-700 focus:outline-none transition-colors"
                  title="Remove experience"
                  disabled={items.length <= 1}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

WorkExperienceForm.propTypes = {
  items: PropTypes.array.isRequired,
  onItemAdd: PropTypes.func.isRequired,
  onItemUpdate: PropTypes.func.isRequired,
  onItemRemove: PropTypes.func.isRequired,
  onItemReorder: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

export default WorkExperienceForm;

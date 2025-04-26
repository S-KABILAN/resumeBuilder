import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { FaTrash, FaPlus, FaGripLines } from "react-icons/fa";

const CustomSectionForm = ({
  items = [],
  onItemAdd,
  onItemUpdate,
  onItemRemove,
  onItemReorder,
  errors = {},
}) => {
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [showTitleInput, setShowTitleInput] = useState(false);

  // Add a default custom section if none exist
  useEffect(() => {
    if (!items || items.length === 0) {
      const defaultSection = {
        id: uuidv4(),
        title: "Profile Summary",
        content:
          "Your professional summary highlighting key skills, experiences, and career goals. This will appear at the top of your resume and give employers a quick overview of your qualifications.",
        isVisible: true,
      };
      onItemAdd(defaultSection);
    }
  }, []);

  const handleAddNewSection = () => {
    if (newSectionTitle.trim()) {
      const newSection = {
        id: uuidv4(),
        title: newSectionTitle,
        content: `Content for your "${newSectionTitle}" section. Replace this with relevant information.`,
        isVisible: true,
      };
      onItemAdd(newSection);
      setNewSectionTitle("");
      setShowTitleInput(false);
    }
  };

  const handleContentChange = (index, content) => {
    const updatedItem = { ...items[index], content };
    onItemUpdate(index, updatedItem);
  };

  const handleTitleChange = (index, title) => {
    const updatedItem = { ...items[index], title };
    onItemUpdate(index, updatedItem);
  };

  const handleVisibilityChange = (index, isVisible) => {
    const updatedItem = { ...items[index], isVisible };
    onItemUpdate(index, updatedItem);
  };

  const getFieldError = (index, fieldName) => {
    if (!errors || !errors[index] || !errors[index][fieldName]) return null;
    return errors[index][fieldName];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
      </div>
    

      {/* Custom section entries */}
      <div className="space-y-6">
        {!items || items.length === 0 ? (
          <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 text-center">
            <p className="text-gray-500">Loading custom sections...</p>
          </div>
        ) : (
          items &&
          items.map((section, index) => (
            <div
              key={section.id || index}
              className="p-6 bg-white rounded-lg border border-gray-200"
              data-draggable-id={`custom-section-${index}`}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <div
                    className="cursor-grab text-gray-400 mr-3"
                    title="Drag to reorder"
                  >
                    <FaGripLines />
                  </div>
                  <input
                    type="text"
                    value={section.title || ""}
                    onChange={(e) => handleTitleChange(index, e.target.value)}
                    className="text-sm  px-2 py-1 border-0 focus:ring-0 focus:border-b-2 focus:border-blue-500"
                    placeholder="Section Title"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={section.isVisible || false}
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
                    title="Remove section"
                    disabled={items.length <= 1}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              <textarea
                value={section.content || ""}
                onChange={(e) => handleContentChange(index, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="Add content for this section..."
              />
              {getFieldError(index, "content") && (
                <p className="mt-1 text-sm text-red-500">
                  {getFieldError(index, "content")}
                </p>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add new section controls */}
      {showTitleInput ? (
        <div className="mb-6">
          <div className="flex items-center">
            <input
              type="text"
              value={newSectionTitle}
              onChange={(e) => setNewSectionTitle(e.target.value)}
              className="flex-grow text-sm px-3 py-2 mr-2 text-gray-700 border rounded-lg focus:outline-none"
              placeholder="Section Title"
            />
            <button
              onClick={handleAddNewSection}
              className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={!newSectionTitle.trim()}
            >
              Add
            </button>
            <button
              onClick={() => setShowTitleInput(false)}
              className="ml-2 px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setShowTitleInput(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <FaPlus className="mr-2" />
            Add Custom Section
          </button>
        </div>
      )}
    </div>
  );
};

CustomSectionForm.propTypes = {
  items: PropTypes.array,
  onItemAdd: PropTypes.func.isRequired,
  onItemUpdate: PropTypes.func.isRequired,
  onItemRemove: PropTypes.func.isRequired,
  onItemReorder: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

export default CustomSectionForm;

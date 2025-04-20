import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const CustomSectionInput = ({ onAddSection }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      const newSection = {
        id: uuidv4(),
        title,
        content,
      };
      onAddSection(newSection);
      setTitle("");
      setContent("");
      setIsExpanded(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-5">
      {isExpanded ? (
        <form onSubmit={handleSubmit}>
          <h3 className="text-lg font-semibold mb-3">Add Custom Section</h3>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Section Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Languages, Hobbies, References, etc."
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Add your content here..."
              required
            />
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Section
            </button>
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full py-2 flex items-center justify-center text-blue-600 border border-blue-500 rounded-md hover:bg-blue-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add Custom Section
        </button>
      )}
    </div>
  );
};

export default CustomSectionInput;

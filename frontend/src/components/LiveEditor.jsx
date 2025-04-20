import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const LiveEditor = ({
  formData,
  activeSection,
  sectionForms,
  renderPreview,
  onSave,
}) => {
  const [splitPosition, setSplitPosition] = useState(50); // Percentage
  const [isDragging, setIsDragging] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const containerRef = useRef(null);
  const previewPanelRef = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newPosition =
      ((e.clientX - containerRect.left) / containerRect.width) * 100;

    // Limit the drag range (10% to 90%)
    const boundedPosition = Math.min(Math.max(newPosition, 20), 80);
    setSplitPosition(boundedPosition);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add and remove event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  // Set cursor style
  useEffect(() => {
    if (isDragging) {
      document.body.style.cursor = "col-resize";
    } else {
      document.body.style.cursor = "default";
    }

    return () => {
      document.body.style.cursor = "default";
    };
  }, [isDragging]);

  const handleFullscreenToggle = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handlePreviewToggle = () => {
    setShowPreview(!showPreview);
  };

  const handleSave = () => {
    onSave();
  };

  const renderActiveForm = () => {
    const FormComponent = sectionForms[activeSection];
    return FormComponent ? <FormComponent /> : null;
  };

  return (
    <div
      className={`${
        isFullScreen ? "fixed inset-0 z-50 bg-white" : "relative h-[85vh]"
      } flex flex-col`}
    >
      {/* Editor Toolbar */}
      <div className="flex items-center justify-between bg-gray-100 border-b p-2">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Save
          </button>
          <div className="border-r h-6 mx-2"></div>
          <button
            onClick={handlePreviewToggle}
            className={`px-3 py-1 rounded ${
              showPreview ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Live Preview
          </button>
        </div>
        <div>
          <button
            onClick={handleFullscreenToggle}
            className="p-1 text-gray-700 hover:text-gray-900"
          >
            {isFullScreen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 4a1 1 0 0 0-1 1v4a1 1 0 0 1-2 0V5a3 3 0 0 1 3-3h4a1 1 0 0 1 0 2H5zm10 10a1 1 0 0 0 1-1v-4a1 1 0 1 1 2 0v4a3 3 0 0 1-3 3h-4a1 1 0 1 1 0-2h4z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 0 1 1-1h4a1 1 0 0 1 0 2H5.414L9 8.586V5a1 1 0 1 1 2 0v5a1 1 0 0 1-1 1H5a1 1 0 1 1 0-2h3.586L5 5.414V8a1 1 0 1 1-2 0V4zm14 12a1 1 0 0 1-1 1h-4a1 1 0 1 1 0-2h2.586L11 11.414V15a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2h-3.586L15 14.586V12a1 1 0 1 1 2 0v4z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        ref={containerRef}
        className="flex flex-grow overflow-hidden relative"
        style={{ cursor: isDragging ? "col-resize" : "default" }}
      >
        {/* Editor Panel */}
        <div
          className="overflow-auto bg-white"
          style={{ width: showPreview ? `${splitPosition}%` : "100%" }}
        >
          <div className="p-4">{renderActiveForm()}</div>
        </div>

        {/* Resizer */}
        {showPreview && (
          <div
            className="w-1 bg-gray-300 hover:bg-blue-400 cursor-col-resize relative z-10"
            onMouseDown={handleMouseDown}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-12 flex items-center justify-center">
              <motion.div
                className="w-1 h-8 bg-gray-500 rounded-full"
                animate={{ opacity: isDragging ? 1 : 0.5 }}
                whileHover={{ opacity: 1 }}
              />
            </div>
          </div>
        )}

        {/* Preview Panel */}
        {showPreview && (
          <div
            ref={previewPanelRef}
            className="overflow-auto bg-gray-50"
            style={{ width: `${100 - splitPosition}%` }}
          >
            <div className="p-4 min-h-full">{renderPreview()}</div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="bg-gray-100 border-t text-xs text-gray-600 px-3 py-1 flex justify-between">
        <div>Editing: {activeSection}</div>
        <div>
          {splitPosition.toFixed(0)}% | {(100 - splitPosition).toFixed(0)}%
        </div>
      </div>
    </div>
  );
};

export default LiveEditor;

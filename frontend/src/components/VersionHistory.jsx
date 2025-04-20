import React, { useState, useEffect } from "react";
import {
  getVersions,
  deleteVersion,
  getVersionById,
} from "../services/versionControlService";
import VersionDiff from "./VersionDiff";
import { formatDistanceToNow } from "date-fns";

const VersionHistory = ({ onApplyVersion }) => {
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedVersions, setSelectedVersions] = useState({
    first: null,
    second: null,
  });

  useEffect(() => {
    loadVersions();
  }, []);

  const loadVersions = () => {
    try {
      const loadedVersions = getVersions();
      setVersions(loadedVersions.sort((a, b) => b.timestamp - a.timestamp));
      setLoading(false);
    } catch (error) {
      setErrorMessage("Failed to load resume versions");
      setLoading(false);
    }
  };

  const handleDeleteVersion = (versionId, e) => {
    e.stopPropagation();
    try {
      deleteVersion(versionId);
      setVersions((prevVersions) =>
        prevVersions.filter((v) => v.id !== versionId)
      );
    } catch (error) {
      setErrorMessage("Failed to delete version");
    }
  };

  const handleApplyVersion = (versionId) => {
    try {
      const version = getVersionById(versionId);
      if (version && version.data) {
        onApplyVersion(version.data);
      }
    } catch (error) {
      setErrorMessage("Failed to apply version");
    }
  };

  const toggleCompareMode = () => {
    setCompareMode((prev) => !prev);
    setSelectedVersions({ first: null, second: null });
  };

  const handleSelectVersion = (versionId) => {
    if (!compareMode) return;

    setSelectedVersions((prev) => {
      if (!prev.first) return { ...prev, first: versionId };
      if (!prev.second) return { ...prev, second: versionId };
      return { first: versionId, second: null };
    });
  };

  const formatTime = (timestamp) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (error) {
      return "Unknown date";
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Loading version history...</div>;
  }

  if (errorMessage) {
    return <div className="p-4 text-red-500">{errorMessage}</div>;
  }

  if (versions.length === 0) {
    return (
      <div className="p-4 text-center text-gray-600">
        No saved versions found
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Version History</h2>
        <div>
          <button
            onClick={toggleCompareMode}
            className={`px-3 py-1 rounded-md text-sm ${
              compareMode
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {compareMode ? "Cancel Compare" : "Compare Versions"}
          </button>
        </div>
      </div>

      {compareMode && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-100 rounded-md">
          <p className="text-sm text-blue-800">
            {!selectedVersions.first
              ? "Select first version to compare"
              : !selectedVersions.second
              ? "Select second version to compare"
              : "Both versions selected"}
          </p>
        </div>
      )}

      {selectedVersions.first && selectedVersions.second && (
        <div className="mb-6">
          <VersionDiff
            version1Id={selectedVersions.first}
            version2Id={selectedVersions.second}
          />
        </div>
      )}

      <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
        {versions.map((version) => (
          <div
            key={version.id}
            onClick={() => handleSelectVersion(version.id)}
            className={`p-3 border rounded-md cursor-pointer transition ${
              compareMode
                ? selectedVersions.first === version.id ||
                  selectedVersions.second === version.id
                  ? "bg-blue-50 border-blue-300"
                  : "hover:bg-gray-50"
                : "hover:bg-gray-50"
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">
                  {version.name || "Unnamed version"}
                </h3>
                <p className="text-sm text-gray-500">
                  {formatTime(version.timestamp)}
                </p>
              </div>
              <div className="flex space-x-2">
                {!compareMode && (
                  <button
                    onClick={() => handleApplyVersion(version.id)}
                    className="px-2 py-1 text-xs bg-green-50 text-green-700 border border-green-200 rounded hover:bg-green-100"
                  >
                    Apply
                  </button>
                )}
                <button
                  onClick={(e) => handleDeleteVersion(version.id, e)}
                  className="px-2 py-1 text-xs bg-red-50 text-red-700 border border-red-200 rounded hover:bg-red-100"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VersionHistory;

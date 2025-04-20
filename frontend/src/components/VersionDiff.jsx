import React from "react";
import { compareVersions } from "../services/versionControlService";
import { formatDistanceToNow } from "date-fns";

const VersionDiff = ({ version1Id, version2Id }) => {
  const [diffData, setDiffData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (!version1Id || !version2Id) {
      setError("Please select two versions to compare");
      setLoading(false);
      return;
    }

    try {
      const compareResult = compareVersions(version1Id, version2Id);
      setDiffData(compareResult);
      setLoading(false);
    } catch (err) {
      setError("Failed to compare versions");
      setLoading(false);
    }
  }, [version1Id, version2Id]);

  const formatTime = (timestamp) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (error) {
      return "Unknown date";
    }
  };

  if (loading) {
    return <div className="flex justify-center p-4">Loading comparison...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (!diffData || !diffData.differences || diffData.differences.length === 0) {
    return (
      <div className="p-4 border rounded-md bg-gray-50">
        <h3 className="text-lg font-medium mb-2">Version Comparison</h3>
        <p>No differences found between the selected versions.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-md p-4 bg-white shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Version Comparison</h3>
        <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-600 mb-2">
          <div className="mb-2 sm:mb-0">
            <span className="font-medium">Current: </span>
            {diffData.version1.name} ({formatTime(diffData.version1.timestamp)})
          </div>
          <div>
            <span className="font-medium">Comparing with: </span>
            {diffData.version2.name} ({formatTime(diffData.version2.timestamp)})
          </div>
        </div>
      </div>

      <div className="divide-y">
        {diffData.differences.map((diff, index) => (
          <div key={index} className="py-3">
            <div className="font-medium text-gray-800 mb-1">
              {diff.section} - {diff.field}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-50 p-2 rounded border border-red-100">
                <div className="text-xs text-gray-500 mb-1">Previous</div>
                <div className="text-sm break-words">
                  {diff.oldValue || "(empty)"}
                </div>
              </div>
              <div className="bg-green-50 p-2 rounded border border-green-100">
                <div className="text-xs text-gray-500 mb-1">Current</div>
                <div className="text-sm break-words">
                  {diff.newValue || "(empty)"}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VersionDiff;

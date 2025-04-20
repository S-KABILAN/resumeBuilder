// Version control service to manage resume version history
const VERSION_STORAGE_KEY = "resume_versions";

// Generate a unique ID for versions
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

// Save a new version of the resume
export const saveVersion = (resumeData, name = "") => {
  try {
    const versions = getVersions();
    const newVersion = {
      id: generateId(),
      name: name || `Version ${versions.length + 1}`,
      timestamp: Date.now(),
      data: resumeData,
    };

    const updatedVersions = [newVersion, ...versions];

    // Limit to 20 versions max to prevent localStorage issues
    const limitedVersions = updatedVersions.slice(0, 20);

    localStorage.setItem(VERSION_STORAGE_KEY, JSON.stringify(limitedVersions));
    return newVersion;
  } catch (error) {
    console.error("Error saving version to localStorage:", error);
    throw new Error("Failed to save version");
  }
};

// Get all saved versions
export const getVersions = () => {
  try {
    const versionsJSON = localStorage.getItem(VERSION_STORAGE_KEY);
    if (!versionsJSON) return [];
    return JSON.parse(versionsJSON);
  } catch (error) {
    console.error("Error retrieving versions from localStorage:", error);
    return [];
  }
};

// Get a specific version by ID
export const getVersionById = (versionId) => {
  const versions = getVersions();
  return versions.find((version) => version.id === versionId);
};

// Delete a specific version
export const deleteVersion = (versionId) => {
  try {
    const versions = getVersions();
    const updatedVersions = versions.filter(
      (version) => version.id !== versionId
    );
    localStorage.setItem(VERSION_STORAGE_KEY, JSON.stringify(updatedVersions));
    return true;
  } catch (error) {
    console.error("Error deleting version from localStorage:", error);
    throw new Error("Failed to delete version");
  }
};

// Compare two versions and return their differences
export const compareVersions = (version1Id, version2Id) => {
  const version1 = getVersionById(version1Id);
  const version2 = getVersionById(version2Id);

  if (!version1 || !version2) {
    throw new Error("One or both versions not found");
  }

  // Both versions should be the same schema - we'll compare them recursively
  return findDifferences(version1.data, version2.data);
};

// Helper function to find differences between two objects
const findDifferences = (obj1, obj2, path = "") => {
  const differences = [];

  // Handle different types
  if (typeof obj1 !== typeof obj2) {
    return [
      {
        path: path || "root",
        previous: obj1,
        current: obj2,
      },
    ];
  }

  // If not objects or arrays, compare directly
  if (typeof obj1 !== "object" || obj1 === null || obj2 === null) {
    if (obj1 !== obj2) {
      differences.push({
        path: path || "root",
        previous: obj1,
        current: obj2,
      });
    }
    return differences;
  }

  // Handle arrays
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    // For simplicity, we'll just compare by index
    const maxLength = Math.max(obj1.length, obj2.length);
    for (let i = 0; i < maxLength; i++) {
      const itemPath = path ? `${path}[${i}]` : `[${i}]`;

      if (i >= obj1.length) {
        // Item was added
        differences.push({
          path: itemPath,
          previous: undefined,
          current: obj2[i],
        });
      } else if (i >= obj2.length) {
        // Item was removed
        differences.push({
          path: itemPath,
          previous: obj1[i],
          current: undefined,
        });
      } else {
        // Compare the items recursively
        const itemDiffs = findDifferences(obj1[i], obj2[i], itemPath);
        differences.push(...itemDiffs);
      }
    }
    return differences;
  }

  // Handle objects
  const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

  for (const key of allKeys) {
    const keyPath = path ? `${path}.${key}` : key;

    if (!(key in obj1)) {
      // Property was added
      differences.push({
        path: keyPath,
        previous: undefined,
        current: obj2[key],
      });
    } else if (!(key in obj2)) {
      // Property was removed
      differences.push({
        path: keyPath,
        previous: obj1[key],
        current: undefined,
      });
    } else {
      // Property exists in both, compare recursively
      const propertyDiffs = findDifferences(obj1[key], obj2[key], keyPath);
      differences.push(...propertyDiffs);
    }
  }

  return differences;
};

export default {
  saveVersion,
  getVersions,
  getVersionById,
  deleteVersion,
  compareVersions,
};

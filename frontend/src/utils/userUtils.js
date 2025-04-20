/**
 * Utility functions for managing user data in local storage
 */

/**
 * Store user data and token in local storage
 * @param {Object} userData - The user data object
 * @param {string} token - The authentication token
 */
export const storeUserData = (userData, token) => {
  try {
    // Validate inputs
    if (!userData || !token) {
      console.error("Invalid user data or token provided");
      return false;
    }

    // Ensure user data has required fields before storing
    if (!userData._id) {
      console.error("User data missing required ID field");
      return false;
    }

    // Store data
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("jwtToken", token);
    return true;
  } catch (error) {
    console.error("Error storing user data:", error);
    return false;
  }
};

/**
 * Retrieve user data from local storage
 * @returns {Object|null} The user data object or null if not found/invalid
 */
export const getUserData = () => {
  try {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      console.warn("No user data found in local storage");
      return null;
    }

    const userData = JSON.parse(userStr);

    // Validate the user data has required fields
    if (!userData || !userData._id) {
      console.error("Invalid user data in local storage");
      return null;
    }

    return userData;
  } catch (error) {
    console.error("Error retrieving user data:", error);
    return null;
  }
};

/**
 * Get current user details - alias for getUserData for backward compatibility
 * @returns {Object|null} The user data object or null if not found/invalid
 */
export const getCurrentUser = () => {
  return getUserData();
};

/**
 * Retrieve user ID from local storage
 * @returns {string|null} The user ID or null if not found/invalid
 */
export const getUserId = () => {
  const userData = getUserData();
  return userData ? userData._id : null;
};

/**
 * Retrieve authentication token from local storage
 * @returns {string|null} The token or null if not found
 */
export const getAuthToken = () => {
  return localStorage.getItem("jwtToken");
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if user is authenticated
 */
export const isAuthenticated = () => {
  return !!getAuthToken() && !!getUserId();
};

/**
 * Clear user data and token from local storage
 */
export const clearUserData = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("jwtToken");
};

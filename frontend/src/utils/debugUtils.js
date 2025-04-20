/**
 * Debug utilities for troubleshooting authentication issues
 */

/**
 * Logs the current authentication state to the console
 * This is useful for debugging authentication issues
 */
export const logAuthState = () => {
  try {
    console.group("Authentication State Debug");
    
    // Check JWT token
    const token = localStorage.getItem("jwtToken");
    console.log("JWT Token exists:", !!token);
    if (token) {
      // Log the first and last few characters of the token
      const start = token.substring(0, 10);
      const end = token.substring(token.length - 10);
      console.log(`Token: ${start}...${end}`);
    }
    
    // Check user data
    const userStr = localStorage.getItem("user");
    console.log("User data exists:", !!userStr);
    
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        console.log("User data is valid JSON:", true);
        console.log("User ID exists:", !!userData._id);
        console.log("User data:", {
          id: userData._id,
          name: userData.name,
          email: userData.email,
          // Don't log sensitive fields
        });
      } catch (e) {
        console.log("User data is valid JSON:", false);
        console.error("Error parsing user data:", e.message);
      }
    }
    
    console.groupEnd();
    return {
      hasToken: !!token,
      hasUserData: !!userStr,
      isValidJson: userStr ? (() => { try { JSON.parse(userStr); return true; } catch { return false; } })() : false
    };
  } catch (error) {
    console.error("Error logging auth state:", error);
    return { error: error.message };
  }
};

/**
 * Fixes common authentication state issues
 * @returns {boolean} True if any fixes were applied
 */
export const fixAuthStateIssues = () => {
  let fixesApplied = false;
  
  try {
    console.group("Authentication State Fixes");
    
    // Check for token without user data
    const token = localStorage.getItem("jwtToken");
    const userStr = localStorage.getItem("user");
    
    if (token && !userStr) {
      console.log("Found token without user data - removing invalid token");
      localStorage.removeItem("jwtToken");
      fixesApplied = true;
    }
    
    // Check for invalid JSON in user data
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        if (!userData || typeof userData !== 'object') {
          console.log("User data is not an object - removing invalid data");
          localStorage.removeItem("user");
          fixesApplied = true;
        } else if (!userData._id) {
          console.log("User data missing _id field - removing invalid data");
          localStorage.removeItem("user");
          localStorage.removeItem("jwtToken"); // Also remove token for consistency
          fixesApplied = true;
        }
      } catch (e) {
        console.log("User data is not valid JSON - removing invalid data");
        localStorage.removeItem("user");
        fixesApplied = true;
      }
    }
    
    console.log("Fixes applied:", fixesApplied);
    console.groupEnd();
    return fixesApplied;
  } catch (error) {
    console.error("Error fixing auth state:", error);
    return false;
  }
}; 
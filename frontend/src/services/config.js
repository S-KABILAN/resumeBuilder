// Configuration file for services

// Get API base URL from environment or set defaults
let API_BASE_URL;

// For production or when environment variables are set
if (import.meta.env.VITE_API_BASE_URL) {
  API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
}
// For development with same origin API
else if (window.location && window.location.origin) {
  // If running on the same domain, use same origin
  if (window.location.hostname === "localhost") {
    API_BASE_URL = "http://localhost:5000"; // Default development server
  } else {
    // For production builds with relative paths
    API_BASE_URL = `${window.location.protocol}//${window.location.hostname}${
      window.location.port ? `:${window.location.port}` : ""
    }`;
  }
}
// Fallback
else {
  API_BASE_URL = "http://localhost:5000";
}

// Add '/api' if it's not already included
export const API_URL = API_BASE_URL.endsWith("/api")
  ? API_BASE_URL
  : `${API_BASE_URL}/api`;

export { API_BASE_URL };

// Log the URL for debugging during development
if (import.meta.env.DEV) {
  console.log("API Base URL:", API_BASE_URL);
  console.log("API URL:", API_URL);
}

/**
 * Utility functions for handling images
 */

/**
 * Get an image with a fallback if it fails to load
 * @param {string} imagePath - Path to the image
 * @returns {string} - Path to the image or fallback
 */
export const getImageWithFallback = (imagePath) => {
  try {
    // Try to require the image
    const image = new URL(
      `../assets/application-images/${imagePath}`,
      import.meta.url
    ).href;
    return image;
  } catch (error) {
    console.error(`Error loading image: ${imagePath}`, error);
    // Return a base64 encoded placeholder image
    return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YxZjVmOSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMzIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIGZpbGw9IiM2YjcyODAiPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4=";
  }
};

/**
 * Fallback image as base64 string
 */
export const fallbackImageBase64 =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YxZjVmOSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMzIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIGZpbGw9IiM2YjcyODAiPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4=";

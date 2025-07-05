// Google Maps JS API Loader
let googleMapsLoaded = false;
let loadPromise = null;

export function loadGoogleMaps(apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY) {
  // Return existing promise if already loading
  if (loadPromise) {
    return loadPromise;
  }

  // Return resolved promise if already loaded
  if (googleMapsLoaded) {
    return Promise.resolve();
  }

  // Check if Google Maps is already available
  if (window.google && window.google.maps) {
    googleMapsLoaded = true;
    return Promise.resolve();
  }

  // Create new loading promise
  loadPromise = new Promise((resolve, reject) => {
    if (!apiKey) {
      reject(new Error('Google Maps API key is required. Set REACT_APP_GOOGLE_MAPS_API_KEY in your .env file.'));
      return;
    }

    // Create script element
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

    // Handle script load
    script.onload = () => {
      googleMapsLoaded = true;
      loadPromise = null;
      resolve();
    };

    // Handle script error
    script.onerror = () => {
      loadPromise = null;
      reject(new Error('Failed to load Google Maps API'));
    };

    // Add script to document
    document.head.appendChild(script);
  });

  return loadPromise;
}

// Helper function to check if Maps is loaded
export function isGoogleMapsLoaded() {
  return googleMapsLoaded && window.google && window.google.maps;
}

// Helper function to get Google Maps instance
export function getGoogleMaps() {
  if (!isGoogleMapsLoaded()) {
    throw new Error('Google Maps is not loaded. Call loadGoogleMaps() first.');
  }
  return window.google.maps;
} 
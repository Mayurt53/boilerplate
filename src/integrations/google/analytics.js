// Google Analytics Event Logging
let gtag = null;
let isInitialized = false;

// Initialize Google Analytics
export function initializeAnalytics(measurementId = process.env.REACT_APP_GA_MEASUREMENT_ID) {
  if (isInitialized) {
    return;
  }

  if (!measurementId) {
    console.warn('Google Analytics Measurement ID not found. Set REACT_APP_GA_MEASUREMENT_ID in your .env file.');
    return;
  }

  // Check if gtag is already available
  if (window.gtag) {
    gtag = window.gtag;
    isInitialized = true;
    return;
  }

  // Create gtag function if not exists
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };
  gtag = window.gtag;

  // Initialize gtag
  gtag('js', new Date());
  gtag('config', measurementId, {
    page_title: document.title,
    page_location: window.location.href,
  });

  // Load Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  isInitialized = true;
}

// Log an event to Google Analytics
export function logEvent(eventName, parameters = {}) {
  // Initialize if not already done
  if (!isInitialized) {
    initializeAnalytics();
  }

  // Log to Google Analytics if available
  if (gtag) {
    gtag('event', eventName, parameters);
  }

  // Fallback to console for development
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics event:', eventName, parameters);
  }
}

// Common event types
export const AnalyticsEvents = {
  // Page views
  PAGE_VIEW: 'page_view',
  
  // User interactions
  BUTTON_CLICK: 'button_click',
  FORM_SUBMIT: 'form_submit',
  LINK_CLICK: 'link_click',
  
  // E-commerce
  ADD_TO_CART: 'add_to_cart',
  REMOVE_FROM_CART: 'remove_from_cart',
  BEGIN_CHECKOUT: 'begin_checkout',
  PURCHASE: 'purchase',
  
  // User engagement
  LOGIN: 'login',
  SIGNUP: 'signup',
  LOGOUT: 'logout',
  
  // Content engagement
  VIDEO_PLAY: 'video_play',
  VIDEO_PAUSE: 'video_pause',
  VIDEO_COMPLETE: 'video_complete',
  
  // Custom events
  CUSTOM: 'custom_event',
};

// Helper functions for common events
export function logPageView(pageTitle, pageLocation) {
  logEvent(AnalyticsEvents.PAGE_VIEW, {
    page_title: pageTitle,
    page_location: pageLocation || window.location.href,
  });
}

export function logButtonClick(buttonName, buttonLocation) {
  logEvent(AnalyticsEvents.BUTTON_CLICK, {
    button_name: buttonName,
    button_location: buttonLocation,
  });
}

export function logFormSubmit(formName, formLocation) {
  logEvent(AnalyticsEvents.FORM_SUBMIT, {
    form_name: formName,
    form_location: formLocation,
  });
}

export function logAddToCart(productId, productName, price, quantity = 1) {
  logEvent(AnalyticsEvents.ADD_TO_CART, {
    product_id: productId,
    product_name: productName,
    price: price,
    quantity: quantity,
  });
}

export function logPurchase(transactionId, value, currency = 'USD', items = []) {
  logEvent(AnalyticsEvents.PURCHASE, {
    transaction_id: transactionId,
    value: value,
    currency: currency,
    items: items,
  });
} 
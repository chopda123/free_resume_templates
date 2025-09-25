// // lib/gtag.js

// /**
//  * Sends a custom event to Google Analytics.
//  * @param {string} action - The name of the event (e.g., 'click_button').
//  * @param {string} category - The category of the event (e.g., 'navigation').
//  * @param {string} label - A descriptive label for the event (e.g., 'Header Blog Link').
//  * @param {number} [value] - An optional numeric value associated with the event.
//  */
// export const event = ({ action, category, label, value }) => {
//   // Check if the window.gtag function exists. It might not on the server-side.
//   if (typeof window.gtag === 'function') {
//     window.gtag('event', action, {
//       event_category: category,
//       event_label: label,
//       value: value,
//     });
//   } else {
//     console.warn('Google Analytics gtag function not found.');
//   }
// };

// lib/gtag.js
export const event = ({ action, category, label, value }) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
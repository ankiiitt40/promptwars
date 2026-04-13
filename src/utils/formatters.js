/**
 * Utility functions for formatting data
 */

/**
 * Formats a decimal to percentage
 * @param {number} value 
 */
export const formatPercent = (value) => {
  return `${(value * 100).toFixed(0)}%`;
};

/**
 * Capitalizes the first letter of each word
 * @param {string} str 
 */
export const capitalizeWords = (str) => {
  if (!str) return '';
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

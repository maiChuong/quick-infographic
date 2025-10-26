// utils.js — Reusable helper functions for Quick Infographic

/**
 * Creates an HTML element with optional class names and attributes.
 * @param {string} tag - The HTML tag to create.
 * @param {string[]} classNames - Array of class names.
 * @param {Object} attributes - Key-value pairs of attributes.
 * @returns {HTMLElement}
 */
export function createElement(tag, classNames = [], attributes = {}) {
  const el = document.createElement(tag);
  classNames.forEach(cls => el.classList.add(cls));
  Object.entries(attributes).forEach(([key, value]) => el.setAttribute(key, value));
  return el;
}

/**
 * Debounces a function to limit how often it runs.
 * @param {Function} fn - The function to debounce.
 * @param {number} delay - Delay in milliseconds.
 * @returns {Function}
 */
export function debounce(fn, delay = 300) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Generates a unique ID with a prefix.
 * @param {string} prefix - Prefix for the ID.
 * @returns {string}
 */
export function generateId(prefix = 'el') {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Loads an image and returns a Promise that resolves when it's ready.
 * @param {string} src - Image source URL or data URI.
 * @returns {Promise<HTMLImageElement>}
 */
export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

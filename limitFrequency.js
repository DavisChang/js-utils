/**
 * Debouncing: Ensures that a function is only called after a specified delay
 * since the last invocation. This is useful for scenarios like input validation or window resizing.
 * @param {*} func
 * @param {*} delay
 * @returns
 */
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

/**
 * Throttling: Ensures a function is called at most once every specified time interval,
 * even if triggered repeatedly (e.g., scroll events).
 * @param {*} func
 * @param {*} limit
 * @returns
 */
function throttle(func, limit) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    }
  };
}

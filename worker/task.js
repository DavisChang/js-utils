/**
 * What you can access in workers:
 *  self (the worker itself)
 *  fetch for making network requests
 *  setTimeout and setInterval
 *  Other non-DOM related APIs like WebSockets, IndexedDB, etc.
 */

// Fibonacci function to calculate the nth Fibonacci number
function fibonacci(num) {
  let a = 1;
  let b = 0;
  while (num > 0) {
    [a, b] = [a + b, a];
    num--;
  }
  return b;
}

// Listen for messages from the main thread
self.onmessage = function (e) {
  const data = e.data;

  // Call the Fibonacci function with the provided number
  const result = fibonacci(data.num);

  // Send the result back to the main thread
  self.postMessage(result);
};

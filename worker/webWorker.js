/**
 * WebWorker class encapsulates worker logic for reuse
 * Dynamically create a web worker
 *
 * Data Cloning and Performance:
 *  Transferable Objects: Large objects, such as typed arrays or ArrayBuffer, can be transferred to the worker without copying them, which can significantly improve performance for large data sets.
 *  Serialization/Deserialization Overhead: Keep in mind that sending large or complex objects between the main thread and workers can have performance costs due to serialization and deserialization (cloning of data).
 * Optimization Tip:
 *  Use ArrayBuffer for large data to avoid performance penalties from deep cloning.
 *  Use Transferable Objects for transferring ownership of objects rather than copying.
 */

class WebWorker {
  constructor(workerFunction) {
    // Feature detection for Worker API
    if (typeof Worker === "undefined") {
      throw new Error("Web Workers are not supported in this environment.");
    }

    // Convert the worker function to a string and create a Blob object
    const code = workerFunction.toString();

    // Create a Blob URL representing the worker's code
    const blob = new Blob([`(${code})()`]);

    // Create a new web worker using the Blob URL
    this.worker = new Worker(URL.createObjectURL(blob));
  }

  // Method to send a message to the worker
  postMessage(message) {
    this.worker.postMessage(message);
  }

  // Method to handle messages sent from the worker
  onMessage(callback) {
    this.worker.onmessage = (e) => callback(e.data);
  }

  // Method to handle any errors that occur inside the worker
  onError(callback) {
    this.worker.onerror = (e) => {
      // Pass error details to the provided callback
      callback(e.message, e.filename, e.lineno, e.colno);
    };
  }

  // Method to terminate the worker when it's no longer needed
  terminate() {
    this.worker.terminate();
  }
}

/**
 * Define multiple functions within the worker
 *
 * What you can access in workers:
 *  self (the worker itself)
 *  fetch for making network requests
 *  setTimeout and setInterval
 *  Other non-DOM related APIs like WebSockets, IndexedDB, etc.
 */

function workerTask() {
  // Function to add two numbers
  function add(a, b) {
    return a + b;
  }

  // Function to multiply two numbers
  function multiply(a, b) {
    return a * b;
  }

  // Listen for messages sent from the main thread
  onmessage = function (e) {
    // Destructure the message object to get the type of operation and the data
    const { type, data } = e.data;
    let result;

    // Execute the appropriate function based on the 'type' value
    if (type === "add") {
      result = add(data.a, data.b); // Call the add function
    } else if (type === "multiply") {
      result = multiply(data.a, data.b); // Call the multiply function
    }

    // Send the result back to the main thread
    postMessage(result);
  };
}

// Example usage of the WebWorker class with feature detection
try {
  const myWorker = new WebWorker(workerTask);

  // Use the worker to call the 'add' function
  myWorker.postMessage({ type: "add", data: { a: 5, b: 10 } });

  // Handle the result from the worker for the 'add' operation
  myWorker.onMessage((result) => {
    console.log("Result from worker (add):", result); // Output: 15
  });

  // Use the worker to call the 'multiply' function
  myWorker.postMessage({ type: "multiply", data: { a: 5, b: 10 } });

  // Handle the result from the worker for the 'multiply' operation
  myWorker.onMessage((result) => {
    console.log("Result from worker (multiply):", result); // Output: 50
  });
} catch (error) {
  console.error(error.message); // Log an error if Web Workers are not supported
}

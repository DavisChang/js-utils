// Check if the Worker API is available
if (typeof Worker !== "undefined") {
  // Create a new worker and point it to 'task.js'
  const worker = new Worker("task.js");

  // Send a message to the worker (e.g., calculate the 20th Fibonacci number)
  worker.postMessage({ num: 20 });

  // Receive the result from the worker
  worker.onmessage = function (e) {
    // Find the HTML element to display the result
    const resultElement = document.getElementById("fibonacci-result");

    // Display the Fibonacci result in the HTML element
    resultElement.textContent = `Fibonacci result: ${e.data}`;
  };

  // Handle errors from the worker
  worker.onerror = function (e) {
    console.error(`Worker error: ${e.message} at ${e.filename}:${e.lineno}`);
  };
} else {
  console.error("Web Workers are not supported in this environment.");
}

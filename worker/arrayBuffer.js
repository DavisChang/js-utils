// Create a new worker
const worker = new Worker("worker.js");

// Example large object
const largeObject = {
  a: "123",
  b: "Some large text data",
  c: new Uint8Array([1, 2, 3, 4, 5]), // Binary data
  d: "Another large string",
};

// Convert the large object to JSON string
const jsonString = JSON.stringify(largeObject);

// Create an ArrayBuffer from the JSON string
const encoder = new TextEncoder();
const buffer = encoder.encode(jsonString).buffer;

// Send the ArrayBuffer to the worker (as a transferable object)
worker.postMessage(buffer, [buffer]);

// Receive the result from the worker
worker.onmessage = function (e) {
  const resultBuffer = e.data;

  // Decode the ArrayBuffer back into a string
  const decoder = new TextDecoder();
  const resultString = decoder.decode(resultBuffer);

  // Parse the string back into an object
  const resultObject = JSON.parse(resultString);
  console.log("Received from worker:", resultObject);
};

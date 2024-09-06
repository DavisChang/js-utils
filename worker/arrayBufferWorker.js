self.onmessage = function (e) {
  const buffer = e.data;

  // Decode the ArrayBuffer into a string
  const decoder = new TextDecoder();
  const jsonString = decoder.decode(buffer);

  // Parse the string into an object
  const receivedObject = JSON.parse(jsonString);
  console.log("Worker received object:", receivedObject);

  // Perform some modifications (optional)
  receivedObject.e = "Additional data from worker";

  // Convert the object back to a JSON string
  const modifiedJsonString = JSON.stringify(receivedObject);

  // Convert the JSON string to ArrayBuffer
  const encoder = new TextEncoder();
  const resultBuffer = encoder.encode(modifiedJsonString).buffer;

  // Send the modified buffer back to the main thread
  self.postMessage(resultBuffer, [resultBuffer]);
};

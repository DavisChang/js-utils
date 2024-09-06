// Exponential Backoff with Retry Logic

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(url, retries = 5, delay = 1000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      // Try to fetch the resource
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      // Return the successful response
      return response;
    } catch (error) {
      if (attempt === retries) {
        // If it's the last attempt, throw the error
        throw new Error(`Failed after ${retries} attempts: ${error.message}`);
      }

      // Calculate the next delay using exponential backoff
      const nextDelay = delay * Math.pow(2, attempt - 1);
      console.warn(`Attempt ${attempt} failed. Retrying in ${nextDelay} ms...`);

      // Wait before retrying
      await sleep(nextDelay);
    }
  }
}

// Usage example
fetchWithRetry("https://example.com/api/data")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("All retries failed:", error));

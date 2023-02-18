import { displayError, removeError } from "./error.js";
import { toggleIndicators, updateIndicators } from "./indicators.js";

export const getSummary = async () => {
  const portsToTry = [5000, 3000];
  for (const port of portsToTry) {
    try {
      const response = await fetch(`http://localhost:${port}/`);
      const summary = await response.json();
      if (summary.length !== 0) {
        removeError();
        updateIndicators(summary);
        return;
      }
    } catch (error) {
      console.error(`Failed to connect to port ${port}: ${error}`);
    }
  }
  toggleIndicators();
  displayError("Error: Could not establish a connection to the pi-hole API. Please make sure that a valid API key has been provided and check if the API key is correct. If the issue persists, please contact your system administrator.");
};

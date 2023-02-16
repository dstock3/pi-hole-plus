import { displayError, removeError } from "./error.js";
import { toggleIndicators, updateIndicators } from "./indicators.js";

export const getSummary = async () => {
  try {
    const response = await fetch(`http://localhost:5000/`);
    const summary = await response.json();
    if (summary.length !== 0) {
      removeError();
      updateIndicators(summary);
    } else {
      toggleIndicators();
      displayError("Error: Could not establish a connection to the pi-hole API. Please make sure that a valid API key has been provided and check if the API key is correct. If the issue persists, please contact your system administrator.");
    }
  } catch (error) {
    console.error(error);
    displayError(error);
  }
};


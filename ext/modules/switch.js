import { toggleIndicators } from './indicators.js';
import { displayError, removeError } from './error.js';

/* enable/disable pi-hole */
const switchContainer = document.querySelector('.switch-container');
const switchLabelContainer = document.querySelector('.switch-label-container');

const updateSwitchState = (newStatus) => {
  const currentStatus = switchContainer.classList.contains('enabled') ? 'enabled' : 'disabled';
  switchContainer.classList.remove(currentStatus);
  switchContainer.classList.add(newStatus);

  switchLabelContainer.childNodes[1].remove();

  const span = document.createElement('span');
  span.classList.add(`${newStatus}-indicator`);
  span.textContent = newStatus.charAt(0).toUpperCase() + newStatus.slice(1);

  switchLabelContainer.appendChild(span);
};

const portsToTry = [5000, 3000];

async function toggleAPI(currentStatus) {
  let responseJson;
  for (const port of portsToTry) {
    try {
      const response = await fetch(`http://localhost:${port}/${currentStatus}`);
      responseJson = await response.json();
      break;
    } catch (error) {
      console.error(`Failed to connect to port ${port}: ${error}`);
    }
  }
  if (!responseJson) {
    throw new Error(`Failed to connect to any of the following ports: ${portsToTry.join(', ')}`);
  }
  return responseJson;
}

export const engageSwitch = (() => {
  const tryPort = async (port) => {
    try {
      const response = await fetch(`http://localhost:${port}/status`);
      const { status } = await response.json();
      return status;
    } catch (error) {
      console.error(`Failed to connect to port ${port}: ${error}`);
      return null;
    }
  };

  const tryPortsInOrder = async () => {
    for (const port of portsToTry) {
      const status = await tryPort(port);
      if (status) {
        switchContainer.classList.add(status);
        const span = document.createElement('span');
        span.classList.add(`${status}-indicator`);
        span.textContent = status.charAt(0).toUpperCase() + status.slice(1);
        switchLabelContainer.appendChild(span);
        removeError();
        break;
      }
    }
  };

  tryPortsInOrder();
})();

export const toggleSwitch = async () => {
  const currentStatus = switchContainer.classList.contains('enabled') ? 'enabled' : 'disabled';
  const newStatus = currentStatus === 'enabled' ? 'disabled' : 'enabled';
  updateSwitchState(newStatus);

  try {
    await toggleAPI(newStatus.slice(0, -1));
  } catch (error) {
    console.error(error);
    toggleIndicators();
    displayError(error);
    updateSwitchState(currentStatus);
  }
};


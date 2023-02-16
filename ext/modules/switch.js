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

async function toggleAPI(currentStatus) {
  try {
    const response = await fetch(`http://localhost:5000/${currentStatus}`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

export const engageSwitch = (() => {
  fetch('http://localhost:5000/status')
    .then(response => response.json())
    .then(({ status }) => {
      if (status) {
        switchContainer.classList.add(status);
        const span = document.createElement('span');
        span.classList.add(`${status}-indicator`);
        span.textContent = status.charAt(0).toUpperCase() + status.slice(1);
        switchLabelContainer.appendChild(span);
        removeError();
      }
    })
    .catch(error => {
      console.error(error);
      toggleIndicators();
      displayError(error);
    });
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


import { toggleIndicators } from '/modules/indicators.js';
import { getSummary } from '/modules/summary.js';
import { toggleSwitch } from '/modules/switch.js';

const updateInterval = 30000;

getSummary();
setInterval(getSummary, updateInterval);

const minimize = document.querySelector('.minimize');
minimize.addEventListener('click', () => {
  toggleIndicators();
  minimize.textContent = minimize.textContent === '-' ? '+' : '-';
});

const mainSwitch = document.querySelector('.main-switch');
mainSwitch.addEventListener('click', toggleSwitch);
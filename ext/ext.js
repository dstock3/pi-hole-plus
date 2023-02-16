import { toggleIndicators } from '/modules/indicators.js';
import { getSummary } from '/modules/summary.js';
import { toggleSwitch } from '/modules/switch.js';

const updateInterval = 5000;

getSummary();
setInterval(getSummary, updateInterval);

const handleMinimizeClick = () => {
  toggleIndicators();
  const minimize = document.querySelector('.minimize');
  minimize.textContent = minimize.textContent === '-' ? '+' : '-';
};

const minimize = document.querySelector('.minimize');
minimize.addEventListener('click', handleMinimizeClick);

const mainSwitch = document.querySelector('.main-switch');
mainSwitch.addEventListener('click', toggleSwitch);
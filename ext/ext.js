import { getSummary } from '/modules/summary.js';
import { updateSpeedTest } from '/modules/speedtest.js';
import { toggleSwitch } from '/modules/switch.js';
import { addMinHandler } from '/modules/minimize.js';

const updateInterval = 5000;

getSummary();
updateSpeedTest();
setInterval(getSummary, updateInterval);
addMinHandler();

const mainSwitch = document.querySelector('.main-switch');
mainSwitch.addEventListener('click', toggleSwitch);
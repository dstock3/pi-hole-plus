/* indicators */
const updateInterval = 30000;

const num = new Intl.NumberFormat();

const toggleIndicators = () => {
  document.querySelectorAll('.ind').forEach((element, index) => {
    element.classList.toggle('hide');
    const margin = element.classList.contains('hide') ? '0' : (index < 2 ? '5px' : '');
    element.style.marginBottom = margin;
  });
};

const errorContainer = document.querySelector('.error-container');

const displayError = (error) => {
  errorContainer.textContent = error;
  errorContainer.classList.remove('hide');
};

const removeError = () => {
  errorContainer.textContent = '';
  errorContainer.classList.add('hide');
};

const updateIndicators = (summary) => {
  if (('error' in summary) || (summary === undefined)) {
    toggleIndicators()
    displayError(summary.error);
  } else {
    const select = (id) => document.querySelector(`#${id}`);
  
    select('total-queries').textContent = num.format(summary.dns_queries_today);
    select('queries-blocked').textContent = num.format(summary.ads_blocked_today);
    select('per-blocked').textContent = `${Math.round(summary.ads_percentage_today)}%`;
    select('domains-blocked').textContent = num.format(summary.domains_being_blocked); 
  }
};

const getSummary = async () => {
  const response = await fetch(`http://localhost:5000/`)
  .catch(error => {
    console.error(error);
    displayError(error);
  });
  const summary = await response.json();
  console.log(summary)
  if (summary.length !== 0) {
    removeError();
    updateIndicators(summary);
  } else {
    toggleIndicators();
    displayError("No data available.");

  }
  
};

getSummary();

setInterval(getSummary, updateInterval);

/* indicator container controls */

let minimize = document.querySelector('.minimize');

minimize.addEventListener('click', () => {
  toggleIndicators()

  minimize.textContent = minimize.textContent === '-' ? '+' : '-';
});

/* enable/disable pi-hole */

const mainSwitch = document.querySelector('.main-switch');
const switchLabelContainer = document.querySelector('.switch-label-container');
const switchContainer = document.querySelector('.switch-container');

async function toggleAPI(currentStatus) {
  try {
    const newStatus = toggleSwitch(currentStatus);
    const response = await fetch(`https://api.example.com/switch?status=${newStatus}`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

const engageSwitch = (() => {
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

const toggleSwitch = () => {
  let currentStatus = switchContainer.classList.contains('enabled') ? 'enabled' : 'disabled';
  let newStatus
  if (currentStatus) newStatus === 'enabled' ? 'disabled' : 'enabled';

  switchContainer.classList.remove(currentStatus);
  switchContainer.classList.add(newStatus);
  
  switchLabelContainer.childNodes[1].remove();
  
  let span = document.createElement('span');

  if (newStatus) {
    span.classList.add(`${newStatus}-indicator`);
    span.textContent = newStatus.charAt(0).toUpperCase() + newStatus.slice(1);
  }

  switchLabelContainer.appendChild(span);

  toggleAPI(newStatus.slice(0, -1));
};

mainSwitch.addEventListener('click', toggleSwitch);
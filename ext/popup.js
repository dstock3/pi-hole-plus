/* indicators */

const updateIndicators = (summary) => {
  let totalQueriesContainer = document.querySelector('#total-queries');
  totalQueriesContainer.textContent = summary.dns_queries_today;

  let blockedQueriesContainer = document.querySelector('#queries-blocked');
  blockedQueriesContainer.textContent = summary.domains_being_blocked;

  let percentageBlocked = document.querySelector('#per-blocked');
  percentageBlocked.textContent = summary.ads_percentage_today;

  let domainsBlocked = document.querySelector('#domains-blocked');
  domainsBlocked.textContent = summary.ads_blocked_today;
}

const getSummary = async () => {
  const response = await fetch(`http://localhost:5000/`);
  const summary = await response.json();
  updateIndicators(summary);
};

getSummary();

/* indicator container controls */
let minimize = document.querySelector('.minimize');
let indicators = Array.from(document.querySelectorAll('.ind'));
indicators.unshift(document.querySelector('.line'))

minimize.addEventListener('click', () => {
  indicators.forEach((element, index) => {
    element.classList.toggle('hide');
    if (element.classList.contains('hide')) {
      element.style.marginBottom = '0';
    } else {
      if (index < 3) {
        element.style.marginBottom = '5px';
      }
    }
  });

  minimize.textContent = minimize.textContent === '-' ? '+' : '-';
});

/* enable/disable pi-hole */

const mainSwitch = document.querySelector('.main-switch');
const switchLabelContainer = document.querySelector('.switch-label-container');
const switchContainer = document.querySelector('.switch-container');

const toggleAPI = (status) =>
  fetch(`http://localhost:5000/${status}`)
    .then(response => {
      return response.json();
    })
    .then(console.log)
    .catch(console.error);

const engageSwitch = (() => {
  fetch('http://localhost:5000/status')
    .then(response => response.json())
    .then(({ status }) => {
      switchContainer.classList.add(status);
      const span = document.createElement('span');
      span.classList.add(`${status}-indicator`);
      span.textContent = status.charAt(0).toUpperCase() + status.slice(1);
      switchLabelContainer.appendChild(span);
    })
    .catch(console.error);
})();

const toggleSwitch = () => {
  let currentStatus = switchContainer.classList.contains('enabled') ? 'enabled' : 'disabled';
  let newStatus = currentStatus === 'enabled' ? 'disabled' : 'enabled';

  switchContainer.classList.remove(currentStatus);
  switchContainer.classList.add(newStatus);
  
  switchLabelContainer.childNodes[1].remove();
  
  let span = document.createElement('span');
  span.classList.add(`${newStatus}-indicator`);
  span.textContent = newStatus.charAt(0).toUpperCase() + newStatus.slice(1);
  
  switchLabelContainer.appendChild(span);

  toggleAPI(newStatus.slice(0, -1));
};

mainSwitch.addEventListener('click', toggleSwitch);
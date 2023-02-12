/* indicators */

const req = async (query) => {
  fetch(`http://localhost:5000/${query}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log(response)
      return response.json();
    })
    .catch(error => console.error(error));
};

const updateTotalQueries = async () => {
  const response = await fetch(`http://localhost:5000/queries`);
  const totalQueries = await response.json();
  let totalQueriesContainer = document.querySelector('#total-queries');
  totalQueriesContainer.innerHTML = totalQueries.length;
};

const updateBlockedQueries = async () => {
  const response = await fetch(`http://localhost:5000/domain-count`);
  const blockedQueries = await response.json();
  console.log(blockedQueries)
  let blockedQueriesContainer = document.querySelector('#queries-blocked');
  blockedQueriesContainer.innerHTML = blockedQueries.domains_being_blocked;
};

const updateAllIndicators = () => {
  updateTotalQueries();
  updateBlockedQueries();
};

updateAllIndicators(); // initial load

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
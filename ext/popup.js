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
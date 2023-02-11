const mainSwitch = document.querySelector('.main-switch');
const switchLabelContainer = document.querySelector('.switch-label-container');
const switchContainer = document.querySelector('.switch-container');


const engageSwitch = (() => {
  const status = 'enabled';
  //hardcoded status for now
  switchContainer.classList.add(status);
  
  let span = document.createElement('span');
  span.classList.add(`${status}-indicator`);
  span.textContent = status.charAt(0).toUpperCase() + status.slice(1);
  
  switchLabelContainer.appendChild(span);
})();

const toggleSwitch = () => {
  let currentStatus = switchContainer.classList.contains('enabled') ? 'enabled' : 'disabled';
  let newStatus = currentStatus === 'enabled' ? 'disabled' : 'enabled';
  
  switchContainer.classList.toggle(currentStatus);
  switchContainer.classList.toggle(newStatus);
  
  switchLabelContainer.childNodes[1].remove();
  
  let span = document.createElement('span');
  span.classList.add(`${newStatus}-indicator`);
  span.textContent = newStatus.charAt(0).toUpperCase() + newStatus.slice(1);
  
  switchLabelContainer.appendChild(span);
};

mainSwitch.addEventListener('click', toggleSwitch);
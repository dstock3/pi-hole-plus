import { showLoading, removeLoading } from './loading.js';

const runSpeedTest = async () => {
  showLoading(document.querySelector('.speedtest'));
  const portsToTry = [5000, 3000];
  for (const port of portsToTry) {
    try {
      const response = await fetch(`http://localhost:${port}/speedtest`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Failed to connect to port ${port}: ${error}`);
    }
  }
};

export const updateSpeedTest = async () => {
  const results = await runSpeedTest();
  const downloadSpeed = document.querySelector('#download-speed');
  const rating = document.querySelector('#rating');

  if (results && results.speed && results.rating) {
    removeLoading(document.querySelector('.speedtest'));
    downloadSpeed.textContent = `Download: ${results.speed}`;
    rating.textContent = `Rating: ${results.rating}`;
    
    switch (results.rating) {
      case 'Excellent':
        rating.style.color = '#00c853';
        break;
      case 'Very good':
        rating.style.color = '#43a047';
        break;
      case 'Good':
        rating.style.color = '#7cb342';
        break;
      case 'Fair':
        rating.style.color = '#ffff00';
        break;
      case 'Poor':
        rating.style.color = '#ff0000';
        break;
    }
  } else {
    downloadSpeed.textContent = 'Could not perform speed test';
    rating.textContent = '';
  }
};


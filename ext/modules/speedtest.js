const runSpeedTest = async () => {
    try {
      const response = await fetch('http://localhost:5000/speedtest');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
};

export const updateSpeedTest = async () => {
    const results = await runSpeedTest();
    const downloadSpeed = document.querySelector('#download-speed');
    const rating = document.querySelector('#rating');
  
    if (results) {
      downloadSpeed.textContent = `Download Speed: ${results.speed}`;
      rating.textContent = `Rating: ${results.rating}`;
    } else {
      downloadSpeed.textContent = 'Could not perform speed test';
      rating.textContent = '';
    }
};
  

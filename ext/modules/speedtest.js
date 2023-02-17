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
    const uploadSpeed = document.querySelector('#upload-speed');
  
    if (results) {
      downloadSpeed.innerHTML = `Download Speed: ${results.speed} Mbps`;
      uploadSpeed.innerHTML = `Rating: ${results.rating}`;
    } else {
      downloadSpeed.innerHTML = 'Could not perform speed test';
      uploadSpeed.innerHTML = '';
    }
};
  

import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const App = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/logs')
      .then(response => {
        setLogs(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="App">
        <ul>
          {logs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
    </div>
  );
}

export default App;

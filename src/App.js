// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [buckets, setBuckets] = useState([]);

  useEffect(() => {
    // Fetch message from Flask backend
    axios.get('/hello')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('There was an error fetching the message!', error);
      });

    // Fetch AWS example data
    axios.get('/aws-example')
      .then(response => {
        setBuckets(response.data.buckets);
      })
      .catch(error => {
        console.error('There was an error fetching the buckets!', error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{message}</h1>
        <h2>AWS S3 Buckets:</h2>
        <ul>
          {buckets.map(bucket => (
            <li key={bucket.Name}>{bucket.Name}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;

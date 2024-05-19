import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [chips, setChips] = useState(600);
  const [reels, setReels] = useState([]);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [error, setError] = useState('');

  const spin = () => {
    axios.post('http://127.0.0.1:3001/spin')
      .then(response => {
        const { reels, score, total_score, chips } = response.data;
        setReels(reels);
        setScore(score);
        setTotalScore(total_score);
        setChips(chips);
        setError('');
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.error) {
          setError(error.response.data.error);
        } else {
          console.error('There was an error spinning!', error);
        }
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>拉霸機</h1>
        <div className="video-container">
          <video width="600" autoPlay loop muted>
            <source src="intro.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <p>籌碼: {chips}</p>
        <button onClick={spin}>開始</button>
        {error && <p style={{color: 'red'}}>{error}</p>}
        <p>目前得分: {score}</p>
        <p>累積得分: {totalScore}</p>
        <div className="reels">
          {reels.map((row, rowIndex) => (
            <div key={rowIndex} className="reel-row">
              {row.map((symbol, colIndex) => (
                <span key={colIndex} className="reel-symbol" style={{ color: 'red' }}>{symbol}</span>
              ))}
            </div>
          ))}
        </div>
        <h2>得分規則</h2>
        <div className="score-rules">
          <table>
            <tbody>
              <tr>
                <td>紅色: 5-300分, 4-75分, 3-30分</td>
              </tr>
              <tr>
                <td>橙色: 5-200分, 4-50分, 3-25分</td>
              </tr>
              <tr>
                <td>黃色: 5-150分, 4-40分, 3-20分</td>
              </tr>
              <tr>
                <td>綠色: 5-125分, 4-30分, 3-15分</td>
              </tr>
              <tr>
                <td>藍色: 5-75分, 4-20分, 3-10分</td>
              </tr>
              <tr>
                <td>靛色: 3-120分</td>
              </tr>
              <tr>
                <td>ABCD: 5-20分, 4-10分, 3-5分</td>
              </tr>
            </tbody>
          </table>
        </div>
      </header>
    </div>
  );
}

export default App;

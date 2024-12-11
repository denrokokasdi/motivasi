import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const QuestionPage = () => {
  const [yaButtonPosition, setYaButtonPosition] = useState({ top: '510px', left: '0px' });
  const [tidakButtonPosition, setTidakButtonPosition] = useState({ top: '200px', left: '210px' });
  const [hoverCount, setHoverCount] = useState(0);
  const [timer, setTimer] = useState(10); // Initialize timer with 10 seconds
  const navigate = useNavigate();

  const getRandomPosition = () => {
    const randomTop = Math.floor(Math.random() * 200);
    const randomLeft = Math.floor(Math.random() * 200);
    return { top: `${randomTop}px`, left: `${randomLeft}px` };
  };

  const handleHover = (button) => {
    const newPosition = getRandomPosition();
    if (button === 'ya') {
      setYaButtonPosition(newPosition);
    } else {
      setTidakButtonPosition(newPosition);
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      // Code to execute when timer reaches 0
      navigate('/happy'); // Replace with the desired route
    }
  }, [timer, navigate]);

  return (
    <div className="container" style={{ position: 'relative', height: '100vh' }}>
      <h1 className="title">Anda Berpuas Hati Dengan Kerja dan Gaji Anda?</h1>
      <h2 className="title">Anda Ada Masa Sebanyak 10 Saat Untuk Menjawab</h2>
      <h3 className="timer">Time left: {timer} seconds</h3> {/* Display the timer */}
      <div className="buttons">
        <button
          className="button ya"
        >
          Ya
        </button>
        <button
          onMouseEnter={() => handleHover('tidak')}
          className="button tidak"
          style={{ position: 'absolute', ...tidakButtonPosition }}
        >
          Tidak
        </button>
      </div>
    </div>
  );
};

export default QuestionPage;

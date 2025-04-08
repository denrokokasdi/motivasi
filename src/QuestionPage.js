import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const QuestionPage = () => {
  const [yaButtonPosition, setYaButtonPosition] = useState({ top: '500px', left: '0px' });
  const [tidakButtonPosition, setTidakButtonPosition] = useState({ top: '400px', left: '0px' });
  const [hoverCount, setHoverCount] = useState(0);
  const [timer, setTimer] = useState(15); // Initialize timer with 10 seconds
  const navigate = useNavigate();

  const getRandomPosition = () => {
    const randomTop = Math.floor(Math.random() * 800);
    const randomLeft = Math.floor(Math.random() * 400);
    return { top: `${randomTop}px`, left: `0px` };
  };

  const handleTidakClick = () => {
    const newPosition = getRandomPosition();
    setTidakButtonPosition(newPosition); // Move "Tidak" button to new random position
  };

  const handleYaClick = () => {
    navigate('/happy'); // Replace with the desired route
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      // Code to execute when timer reaches 0
      navigate('/happy'); // Replace with the desired route
    }
  }, [timer, navigate]);

  return (
    <div className="container" style={{ position: 'relative', height: '100vh' }}>
      <h1 className="title1">Anda Berpuas Hati Dengan Kerja Anda?</h1>
      <h1 className="title1">Anda Berpuas Hati Dengan Boss?</h1>
      <h2 className="title2">Hanya 15 Saat Untuk Menjawab</h2>
      <h3 className="timer">Time left: {timer} seconds</h3> {/* Display the timer */}
      <div className="buttons">
        <button
          onClick={handleYaClick}
          className="button ya"
          style={{ position: 'absolute', ...yaButtonPosition }}
        >
          Ya
        </button>
        <button
          onClick={handleTidakClick} // Trigger onClick instead of onMouseEnter
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

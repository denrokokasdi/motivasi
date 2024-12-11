import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HappyPage.css'; // Import the CSS file

const HappyPage = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleBackClick = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className="container">
      <h1>Nampaknya anda bahagia, teruskan bekerja</h1>
      <button onClick={handleBackClick}>Back</button>
    </div>
  );
};

export default HappyPage;

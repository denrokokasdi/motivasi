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
      <h1>Nampaknya anda berpuas hati, teruskan bekerja</h1>
      <img 
        src="https://media.tenor.com/1hJ8DMZyvSsAAAAM/najib-bosskur.gif" 
        alt="Najib Bosskur" 
        className="happy-image" 
      />
      <button onClick={handleBackClick}>🔙Back</button>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>visit : https://motivasi-den-kasdis-projects.vercel.app/</p>
    </div>
  );
};

export default HappyPage;

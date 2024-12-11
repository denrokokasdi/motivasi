import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes and Route
import QuestionPage from './QuestionPage';
import HappyPage from './HappyPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuestionPage />} />
        <Route path="/happy" element={<HappyPage />} />
      </Routes>
    </Router>
  );
};

export default App;

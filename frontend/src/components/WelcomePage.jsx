
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/WelcomePage.css';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="welcome-container">
      <h1>Welcome Coders</h1>
      <div className="button-group">
        <button className="btn" onClick={handleRegisterClick}>Register</button>
        <button className="btn" onClick={handleLoginClick}>Login</button>
      </div>
    </div>
  );
};

export default WelcomePage;

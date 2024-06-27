import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleSolveProblems = () => {
    navigate('/solve-problems');
  };

  const handleAddProblem = () => {
    navigate('/add-problem');
  };

  const handleGoToCompiler = () => {
    navigate('/online-compiler');
  };


  return (
    <div className="home-container">
      <h1>Welcome Coders</h1>
      <div className="button-container">
        <button className="btn" onClick={handleSolveProblems}>
          Solve Problems
        </button>
        <button className="btn" onClick={handleAddProblem}>
          Add Problem
        </button>
        <button className="btn" onClick={handleGoToCompiler}>
          Online Compiler
        </button>
      </div>
    </div>
  );
};

export default HomePage;

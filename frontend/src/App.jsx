
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import OnlineCompilerPage from './components/OnlineCompilerPage';
import AddProblemPage from './components/AddProblemPage';
import SolveProblemsPage from './components/SolveProblemsPage';
import SolveProblemPage from './components/SolveProblemPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/online-compiler" element={<OnlineCompilerPage />} />
          <Route path="/add-problem" element={<AddProblemPage />} />
          <Route path="/solve-problems" element={<SolveProblemsPage />} />
          <Route path="/solve-problem" element={<SolveProblemPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

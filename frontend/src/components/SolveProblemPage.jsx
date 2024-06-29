import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/SolveProblemPage.css';

const SolveProblemPage = () => {
  const location = useLocation();
  const { problem } = location.state || {};
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('');
  const [verdict, setVerdict] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (problem) {
      setLoading(false);
    }
  }, [problem]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`http://3.109.124.142:8080/submit`, { id:problem._id, code, language });
      setVerdict(response.data); // Assuming response.data contains the verdict string
    } catch (error) {
      console.error('Error submitting code:', error);
      setVerdict('Error submitting code');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="solve-problem-container">
      <div className="left-panel">
        <p className="problem-name">{problem.problemName}</p>
        <p className={`problem-difficulty difficulty-${problem.problemDifficulty.toLowerCase()}`}>
          {problem.problemDifficulty}
        </p>
        <div className="problem-statement">{problem.problemStatement}</div>
        <div className="problem-sample">
          <h4>Sample Input:</h4>
          <pre>{problem.sampleInput}</pre>
          <h4>Sample Output:</h4>
          <pre>{problem.sampleOutput}</pre>
        </div>
        <div className="problem-tags">
          <strong>Problem Tags: </strong>{problem.problemTags}
        </div>
      </div>
      <div className="right-panel-SolveProblemPage">
        <div className="language-select">
          <label htmlFor="language">Select Language:</label>
          <select id="language" value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="">None</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="py">Python</option>
          </select>
        </div>
        <textarea
          className="code-editor"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Write your code here..."
        >Code:</textarea>
        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
        {verdict && (
          <div className={`verdict ${verdict === 'Accepted' ? 'accepted' : 'failed'}`}>
            VERDICT: {verdict}
          </div>
        )}
      </div>
    </div>
  );
};

export default SolveProblemPage;

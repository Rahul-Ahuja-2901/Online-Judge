import React, { useState } from 'react';
import axios from 'axios';
import '../styles/OnlineCompilerPage.css';

const OnlineCompilerPage = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('');

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleRunCode = async () => {
    try {
      const response = await axios.post('http://3.109.124.142:8080/run', {
        language,
        code,
        input,
      });
      setOutput(response.data);
    } catch (error) {
      console.error('Error executing code:', error);
      setOutput(error);
    }
  };

  return (
    <div className="online-compiler">
      <div className="language-selector">
        <label htmlFor="language" className="language-label">Language:</label>
        <select id="language" value={language} onChange={handleLanguageChange}>
          <option value="">None</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="py">Python</option>
        </select>
      </div>
      <div className="compiler-body">
        <div className="left-panel">
          <h2>Code:</h2>
          <textarea
            value={code}
            onChange={handleCodeChange}
            placeholder="Write your code here..."
          ></textarea>
        </div>
        <div className="right-panel">
          <div className="input-section">
            <h2>Custom Input:</h2>
            <textarea
              value={input}
              onChange={handleInputChange}
              placeholder="Enter custom input..."
            ></textarea>
          </div>
          <div className="output-section">
            <h2>Output:</h2>
            <textarea
              value={output}
              readOnly
              placeholder="Output will be displayed here..."
            ></textarea>
          </div>
          <div className="btn-container">
            <button onClick={handleRunCode} className="btn">Run</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineCompilerPage;

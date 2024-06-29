import React, { useState } from "react";
import axios from "axios";
import "../styles/AddProblemPage.css";

const AddProblem = () => {
  const [formData, setFormData] = useState({
    problemName: "",
    problemStatement: "",
    constraints: "",
    problemDifficulty: "",
    problemTags: "",
    sampleInput: "",
    sampleOutput: "",
    privateInput: "",
    privateOutput: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://3.109.124.142:8080/add-problem",
        formData
      );
      setResponseMessage(response.data);
    } catch (error) {
      setResponseMessage("Error adding problem: " + error.message);
    }
  };

  const messageStyle = {
    color: responseMessage.includes("successfully") ? 'green' : 'red',
    marginTop: '5px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    fontWeight: 'bold'
  };

  return (
    <div className="add-problem">
      <form onSubmit={handleSubmit} className="form-container">
        <div className="left-panel">
          <div className="form-group">
            <div className="problem-name">
              <label>Problem Name:</label>
              <textarea
                name="problemName"
                value={formData.problemName}
                onChange={handleChange}
                placeholder="Enter problem name..."
              />
            </div>
          </div>
          <div className="form-group">
            <div className="problem-statement">
              <label>Problem Statement:</label>
              <textarea
                name="problemStatement"
                value={formData.problemStatement}
                onChange={handleChange}
                placeholder="Enter problem statement..."
                className="wide-textarea"
              />
            </div>
          </div>
          <div className="form-group">
            <div className="constraints">
              <label>Constraints:</label>
              <textarea
                name="constraints"
                value={formData.constraints}
                onChange={handleChange}
                placeholder="Enter constraints..."
              />
            </div>
          </div>
          <div className="form-group">
            <div className="problem-difficulty">
              <label>Problem Difficulty:</label>
              <select
                name="problemDifficulty"
                value={formData.problemDifficulty}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <div className="problem-tags">
              <label>Problem Tags:</label>
              <textarea
                name="problemTags"
                value={formData.problemTags}
                onChange={handleChange}
                placeholder="Enter tags separated by space..."
              />
            </div>
          </div>
        </div>
        <div className="right-panel">
          <div className="form-group">
            <div className="sample-input">
              <label>Sample Input Test Cases:</label>
              <textarea
                name="sampleInput"
                value={formData.sampleInput}
                onChange={handleChange}
                placeholder="Enter sample input..."
                className="equal-width"
              />
            </div>
          </div>
          <div className="form-group">
            <div className="sample-output">
              <label>Sample Output Test Cases:</label>
              <textarea
                name="sampleOutput"
                value={formData.sampleOutput}
                onChange={handleChange}
                placeholder="Enter sample output..."
                className="equal-width"
              />
            </div>
          </div>
          <div className="form-group">
            <div className="private-input">
              <label>Private Input Test Cases:</label>
              <textarea
                name="privateInput"
                value={formData.privateInput}
                onChange={handleChange}
                placeholder="Enter private input..."
                className="equal-width"
              />
            </div>
          </div>
          <div className="form-group">
            <div className="private-output">
              <label>Private Output Test Cases:</label>
              <textarea
                name="privateOutput"
                value={formData.privateOutput}
                onChange={handleChange}
                placeholder="Enter private output..."
                className="equal-width"
              />
            </div>
          </div>
          {responseMessage && <div style={messageStyle}>{responseMessage}</div>}
          <button type="submit" className="btn">
            Add Problem
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProblem;

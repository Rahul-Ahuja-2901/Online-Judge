import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/SolveProblemsPage.css";
import { useNavigate } from "react-router-dom";

const SolveProblemsPage = () => {
  const [problems, setProblems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/get-all-problems"
        );
        setProblems(response.data);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    fetchProblems();
  }, []);

  const handleSolveProblem = async (id) => {
    try {
      const response = await axios.post('http://localhost:8080/get-problem', { id });
      const problem = response.data;
      navigate('/solve-problem', { state: { problem } });
    } catch (error) {
      console.error('Error fetching problem:', error);
    }
  };

  return (
    <div className="solve-problems-container">
      <h1>Problems</h1>
      <table className="problems-table">
        <thead>
          <tr>
            <th>Problem Id</th>
            <th>Problem Name</th>
            <th>Problem Difficulty</th>
            <th>Problem Tags</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem, index) => (
            <tr key={problem._id}>
              <td>{index + 1}</td>
              <td className="problem-name">{problem.problemName}</td>
              <td
                className={`difficulty-${problem.problemDifficulty.toLowerCase()}`}
              >
                {problem.problemDifficulty}
              </td>
              <td>
                <div className="tags-container">
                  {problem.problemTags.split(" ").map((tag, tagIndex) => (
                    <span key={tagIndex} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </td>
              <td>
                <button
                  className="solve-btn"
                  onClick={() => handleSolveProblem(problem._id)}
                >
                  Solve Problem
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SolveProblemsPage;

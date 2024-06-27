
import React, { useState } from 'react';
import { registerUser } from '../api';
import '../styles/RegisterPage.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      setIsSuccess(true);
      setMessage(response);
    } catch (error) {
      console.error('Registration error:', error);
      setIsSuccess(false);
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
      <h1>Register</h1>
        {message && (
        <p style={{ color: isSuccess ? 'green' : 'red' }}>{message}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>First Name</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Last Name</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Email ID</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
          </div>
          <div className="btn-container">
            <button className="btn" type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

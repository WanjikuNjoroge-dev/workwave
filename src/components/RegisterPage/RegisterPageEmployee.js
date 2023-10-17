import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './RegisterPage.css';

const RegisterPage = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [details, setDetails] = useState({ name: '', email: '', password: '', role: '' });
  const navigate = useNavigate(); // Use useNavigate hook to access navigation

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleRegister = () => {
    // Send registration data to the PHP backend
    fetch('http://localhost/workwave/registeremployees.php', {
      method: 'POST',
      body: JSON.stringify(details),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data); // Handle the response from the PHP script
        // Check if registration was successful, then navigate to the login page
        if (data === 'Registration successful') {
          navigate('/login-employee'); // Redirect to the login page
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Create Your Account</h2>
        <p>EMPLOYEE REGISTRATION</p>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={details.name}
          onChange={handleInputChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={details.email}
          onChange={handleInputChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={details.password}
          onChange={handleInputChange}
        />

        <button className="register-button" onClick={handleRegister}>
          Register
        </button>

        <p>
          Already have an account? <Link to="/login-employee">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

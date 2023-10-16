import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { AuthContext } from '../../contexts/AuthContext';
import { Button, TextField } from '@mui/material';
import './LoginPage.css';

const LoginPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { setIsAuthenticated } = useContext(AuthContext);
  const [loginDetails, setLoginDetails] = useState({ email: '', password: '', role: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleLogin = () => {
    // Send login data to the server for authentication
    fetch('http://localhost/workwave/login.php', {
      method: 'POST',
      body: JSON.stringify(loginDetails),
    })
      .then((response) => response.text())
      .then((data) => {
        if (data === 'Login successful') {
          setIsAuthenticated(true);   

          // Check the user's role and redirect accordingly
          if (loginDetails.role === 'manager') {
            window.location.href = '/manager-dashboard'; // Redirect to the manager dashboard
          } else {
            window.location.href = '/employee-dashboard'; // Redirect to the employee dashboard
          }
        } else {
          // Handle login failure, display an error message, etc.
          console.error('Login failed:', data);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login to Your Account</h2>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={loginDetails.email}
          onChange={handleInputChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginDetails.password}
          onChange={handleInputChange}
        />

        <select
          name="role"
          value={loginDetails.role}
          onChange={handleInputChange}
        >
          <option value="" disabled>Select your role</option>
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
        </select>

        <button className="login-button" onClick={handleLogin}>
          Login
        </button>

        <Link to="/register">Register</Link><p>Don't have an account? </p>
        <Link className="" onClick={() => setShowModal(true)}>Register here</Link>

        <div id="roleModal" className={`role-modal ${showModal ? "show-modal" : ""}`} onClick={() => setShowModal(false)}>
          <div className="role-modal-content" onClick={e => e.stopPropagation()}>
            <span id="closeModal" className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Choose Your Role</h2>
            <p>Are you an employer looking to monitor tasks? Or an employee aiming to track your accomplishments? Make your choice below:</p>
            <Link to="/register-manager" className="role-btn">I'm a Manager</Link>
            <Link to="/register-employee" className="role-btn">I'm an Employee</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

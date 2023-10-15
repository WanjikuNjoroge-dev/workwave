import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { AuthContext } from '../../contexts/AuthContext';
import './LoginPage.css';

const LoginPage = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [loginDetails, setLoginDetails] = useState({ email: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleLogin = () => {
    // Send login data to the server for authentication
    fetch('http://localhost/workwave/loginemployees.php', {
      method: 'POST',
      body: JSON.stringify(loginDetails),
    })
      .then((response) => response.text())
      .then((data) => {
        if (data === 'Login successful as employee') {
          setIsAuthenticated(true);   

          // Redirect to the employee dashboard
          window.location.href = '/employee-dashboard';
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
        <p>EMPLOYEE LOGIN</p>

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

        <button className="login-button" onClick={handleLogin}>
          Login
        </button>

        <Link to="/register-employee">Register</Link>
      </div>
    </div>
  );
};

export default LoginPage;

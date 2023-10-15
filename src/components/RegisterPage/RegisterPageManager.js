import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [details, setDetails] = useState({ name: '', email: '', password: '' });
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // State for success message

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    };
  
  const handleRegister = () => {
    // Send registration data to the PHP backend
    fetch('http://localhost/workwave/registermanager.php', {
      method: 'POST',
      body: JSON.stringify(details),
    })

    .then((response) => response.text())
    .then((data) => {
      if (data === 'Registration successful') {
        setRegistrationSuccess(true); // Show success message
        setIsAuthenticated(true);
      } else {
        console.error('Registration failed:', data);
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
          <p>MANAGER REGISTRATION</p>
  
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

          {registrationSuccess && (
          <p>Registration successful!</p> )}

          <p>
          Already have an account? <Link to="/login-manager">Login here</Link>
        </p>
        </div>
      </div>
    );
  };
  
  export default RegisterPage;
  
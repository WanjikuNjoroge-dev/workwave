import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="home-container">
            <h1>Welcome to WorkWave</h1>
            <div className="home-content">
                <div className="about-section">
                    <h2>About Employee Time & Deliverables Tracker</h2>
                    <p>
                        In today's competitive workspace, ensuring optimal productivity is crucial. Our application facilitates a platform for employees to accurately log work hours and tasks.
                    </p>
                    <p>
                        With time recording features, every working minute is captured. Alongside, our task tracking ensures every deliverable is transparently accounted for.
                    </p>
                    <p>
                        Managers benefit from a dedicated dashboard, offering insights into employee productivity. This centralized approach aids in decision-making and resource allocation.
                    </p>
                    <p>
                        Integrated with modern logging and monitoring, our tool ensures a data-driven approach to drive strategies and excellence.
                    </p>
                </div>
                <img src="https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?fit=crop&w=600&h=400" alt="Office workspace" className="home-image" />
            </div>
            <div className="home-buttons">
                <Link to="/register" className="home-btn register-btn">Register</Link>
                <Link to="/login" className="home-btn login-btn">Login</Link>
            </div>
        </div>
    );
}


export default HomePage;

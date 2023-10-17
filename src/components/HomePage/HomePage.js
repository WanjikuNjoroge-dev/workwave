import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="home-container">
            <h1>Unlocking Productivity, One Task at a Time.</h1>
            <p className="tagline">Join WorkWave and streamline your work hours and tasks like never before.</p>
            <div className="home-content">
                <div className="about-section">
                    <h2>Why Choose WorkWave?</h2>
                    <p>
                        Optimize your working hours and make every minute count. Log tasks with precision.
                    </p>
                    <p>
                        Managers get actionable insights. Simplify decision-making and resource allocation.
                    </p>
                    <p>
                        Advanced logging and monitoring ensure a data-driven approach to excellence.
                    </p>
                    <div className="home-buttons">
                        <button className="home-btn register-btn" onClick={() => setShowModal(true)}>Get Started</button>

                        <div id="roleModal" className={`role-modal ${showModal ? "show-modal" : ""}`} onClick={() => setShowModal(false)}>
                            <div className="role-modal-content" onClick={e => e.stopPropagation()}>
                                <span id="closeModal" className="close" onClick={() => setShowModal(false)}>&times;</span>
                                <h2>Choose Your Role</h2>
                                <p>Are you an employer looking to monitor tasks? Or an employee aiming to track your accomplishments? Make your choice below:</p>
                                <Link to="/register-manager" className="role-btn">I'm a Manager</Link>
                                <Link to="/register-employee" className="role-btn">I'm an Employee</Link>
                            </div>
                        </div>


                        <Link to="/login-employee" className="home-btn login-btn-employee">Login as Employee</Link>
                        <Link to="/login-manager" className="home-btn login-btn-manager">Login as Manager</Link>
                    </div>
                </div>
                <img src="https://images.unsplash.com/photo-1556761175-4b46a572b786?fit=crop&w=600&h=400" alt="Inspiring office workspace" className="home-image" />
            </div>
            <Footer />
        </div>
    );
}

const Footer = () => {
    return (
        <div className="footer-container">
            <p>© 2023 WorkWave. All rights reserved.</p>
        </div>
    );
}

export default HomePage;

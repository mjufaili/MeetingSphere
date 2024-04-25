
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Nav.css';

function Navbar() {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="navbar-logo" onClick={() => navigate('/')}>
                    MeetingSphere
                </div>
                <div className="nav-items">
                    <ul className="nav-links">
                        <li><Link to="/" className="nav-link">Home Page</Link></li>
                        <li><Link to="/faqs" className="nav-link">FAQS</Link></li>
                        <li><Link to="/contact" className="nav-link">Contact</Link></li>
                    </ul>
                    {/* Login/Signup Button */}
                    <Link to="/login" className="nav-link login-text">Login</Link>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;

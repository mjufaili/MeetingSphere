import React from 'react';
import './css/Footer.css'; // Make sure to create a Footer.css file for styling

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} CSCI4177-Group21. All rights reserved.</p>
                <p>Privacy Policy | Terms of Use | Contact Us</p>
            </div>
        </footer>
    );
}

export default Footer;

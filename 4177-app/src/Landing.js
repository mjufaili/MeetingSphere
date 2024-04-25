import React from 'react';
import Navbar from './Components/NaviBar_Main';
import './css/Landing.css';
import activityImage from './img/prototype-illustration.svg';
import Footer from './Components/Footer';
import Features from './Components/Features';

function LandingPage() {
    return (
        <>
            <Navbar />
            <div className="landing">
                <div className="landing ">
                    <div className="text-content">
                        <h1>Manage your activities and optimize your time</h1>
                        <p>Take control of your time and increase productivity. We offer best-in-class event management solutions.</p>
                        <a href="/login"><button className="button">Start</button></a>
                    </div>
                    <div className="image-content">
                        <img src={activityImage} alt="Manage Activities" />
                    </div>
                </div>
            </div>
            <Features />
            <Footer />
        </>
    );
}


export default LandingPage;

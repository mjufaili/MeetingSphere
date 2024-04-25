/* Author: Kaiyang Hu*/
/* B number: B00871238*/

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import './css/Nav_dash.css';

function Navbar() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');


    const handleLogout = () => {
        localStorage.removeItem('token');
        console.log("logout success");
        navigate('/login');
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios({
            method: 'get',
            url: 'https://group-project-csci4177.onrender.com/userSignup/getUsername',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setUsername(response.data.username);
        }).catch(error => {
            console.error('Error fetching username', error);
            navigate('/login');
        });
    }, [navigate]);

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="navbar-logo" onClick={() => navigate('/')}>
                    MeetingSphere
                </div>
                <div className="nav-items">
                    <ul className="nav-links">
                        <li className="nav-item"><Link to="/Dashboard" className="nav-link">Dashboard</Link></li>
                        <li className="nav-item"><Link to="/ActivitiesPage" className="nav-link">Activities</Link></li>
                        <li className="nav-item"><Link to="/GroupsPage" className="nav-link">Group</Link></li>
                        <li className="nav-item"><Link to="/invite" className="nav-link">Invite</Link></li>
                        <li className="nav-item dropdown">
                            <div className="dropdown-toggle" role="button" data-toggle="dropdown">
                                {username || "Username"}
                            </div>
                            <div className="dropdown-menu">
                                <Link to="/profile" className="dropdown-item">Profile</Link>
                                <div className="dropdown-item" onClick={handleLogout}>Logout</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

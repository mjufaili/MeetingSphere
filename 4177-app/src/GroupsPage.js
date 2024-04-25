import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//import { BsPencilSquare } from 'react-icons/bs';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import './css/GroupsPage.css'; 
import Navbar from "./Components/NaviBar_Dash";
import axios from 'axios'; // Import axios for making HTTP requests

const GroupsPage = () => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        // Fetch groups from the backend when the component mounts
        const fetchGroups = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await axios.get('https://group-project-csci4177.onrender.com/groups', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setGroups(response.data);
            } catch (error) {
                console.error('Error fetching groups:', error);
                if (error.response && error.response.status === 401) {
                    alert('Session expired. Please log in again.');
                    window.location.href = '/login';
                }
            }
        };

        fetchGroups();
    }, []);

    return(
        <>
            <Navbar />
            <div className="GroupsPage"> {/* Changed class name */}
                <div className="cg-btn-background"> {/* Changed class name */}
                    <Link to="/createGroup" className="create-group-btn"> {/* Changed class name */}
                        <AiOutlinePlusCircle /> Create Group
                    </Link>
                </div>
                <div className="groups-container"> {/* Changed class name */}
                    <div className="d-flex flex-wrap justify-content-center">
                        {groups.map((group, index) => (
                            <div key={index} className="card group-card m-2"> {/* Changed class name */}
                                <div className="card-body">
                                    <h5 className="card-title">{group.name}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{group.groupId}</h6>
                                    <p className="card-text">{group.description}</p>
                                    <p className="card-text">Invite Member: {group.inviteMember}</p>
                                    {/* Edit button can be added if needed */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default GroupsPage;

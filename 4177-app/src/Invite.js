// Andrew Cole
import React from 'react';
import Navbar from './Components/NaviBar_Dash';
import './css/Invite.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

// Function for filtering users from the user list (to be be replaced with a back-end database check)

const FilterUsers = async (q) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log("No token found");
            return [];
        }

        const response = await axios.get('https://group-project-csci4177.onrender.com/userSearch/', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: { query: q }
        });
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        console.error('Error searching users:', error);
        return [];
    }
};

// Functional component for rendering the user list
const UserList = (props) => {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        FilterUsers(props.query)
            .then((data) => {
                setUserList(data);
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
            });
    }, [props.query]);

    if (props.query.length === 0) {
        return <p>Start typing a user's name...</p>;
    }

    if (userList.length > 0) {
        return (
            <ul className='user-list'>
                {userList.map((user) => (
                    <li key={user.id} className='invite'>
                        {user.firstName}&nbsp;{user.lastName}
                    </li>
                ))}
            </ul>
        );
    } else {
        return <UserNotFound />;
    }
};

// Component shown when a searched user is not registered
const UserNotFound = () => {
    return (
        <div className='not-found'>
            <p>That user could not be found. Please make sure you typed the name correctly.</p>
            <p>If this user isn't already using MeetingSphere, enter their email address below to invite them!</p>
            <form action='#'>
                <input id='email' type='email'></input>&nbsp;
                <button id='email-submit'>Invite</button>
            </form>
        </div>
    );
};

function Profile() {
    const [query, setQuery] = useState('');
    return (
        <>
            <Navbar />
            <div className='content'>
                <h1>Invite a user</h1>
                <div className='search-container'>
                    <input className='search empty' type='text' onChange={e => setQuery(e.target.value)}></input>
                    <div className='results'>
                        <UserList query={query} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;

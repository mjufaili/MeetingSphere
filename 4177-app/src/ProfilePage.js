/* Author: Kaiyang Hu*/
/* B number: B00871238*/


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/ProfilePage.css';
import Navbar from "./Components/NaviBar_Dash";

const ProfilePage = () => {
    const [editMode, setEditMode] = useState(false);
    const [profile, setProfile] = useState({
        username: '',
        email: ' ',
        firstName: ' ',
        lastName: ' ',
        organization: ' ',
        location: ' ',
        phone: ' ',
        birthday: ' '
    });

    const fetchProfile = () => {
        const token = localStorage.getItem('token');
        axios({
            method: 'post',
            url: 'https://group-project-csci4177.onrender.com/profile/check-and-create',
            headers: {
                Authorization: `Bearer ${token}`
            },
        }).then(response => {
            const { _id, __v, user, birthday, ...profileData } = response.data;
            const formattedBirthday = birthday.split('T')[0];
            setProfile({
                ...profileData,
                birthday: formattedBirthday, // Use the formatted birthday
            });
            console.log(response.data);
        }).catch(error => {
            console.error('Error:', error);
        });
    };


    useEffect(() => {
        fetchProfile();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (editMode) {
            axios({
                method: 'put',
                url: 'https://group-project-csci4177.onrender.com/profile/update',
                data: profile,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }).then(() => {
                fetchProfile();
                setEditMode(false); // Exit edit mode
            }).catch(error => {
                console.error('Error:', error);
            });
        } else {
            setEditMode(true);
        }
    };


    return (
        <>
            <Navbar />
            <div className="profile-page">
                <div className="profile-picture-section">
                    <h2>Profile Picture</h2>
                    <div className="image-container">
                        <img src="" alt="Profile" className="profile-picture"/>
                    </div>
                </div>
                <form className="profile-form" onSubmit={handleSubmit}>
                    <h2>Account Details</h2>
                    {Object.keys(profile || {}).map((key) => (
                        <label key={key}>
                            {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                            <input
                                type={key === 'email' ? 'email' : key === 'phone' ? 'tel' : key === 'birthday' ? 'date' : 'text'}
                                name={key}
                                value={profile[key]}
                                onChange={(e) => setProfile({ ...profile, [e.target.name]: e.target.value })}
                                readOnly={key === 'username' || key === 'email' || !editMode}
                            />
                        </label>
                    ))}
                    <button type="submit" className="btn-save">
                        {editMode ? 'Save Changes' : 'Edit'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default ProfilePage;








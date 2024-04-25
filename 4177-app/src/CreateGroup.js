import React, { useState } from 'react';
import axios from 'axios';
import Navbar from "./Components/NaviBar_Dash";
import './css/CreateGroup.css';
import {useNavigate } from 'react-router-dom';
function CreateGroup() {

    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        name: '',
        inviteMember: '',
        description: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs({ ...inputs, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!inputs.name || !inputs.inviteMember || !inputs.description) {
            alert('Please complete the form');
        } else {
            const groupData = {
                name: inputs.name,
                inviteMember: inputs.inviteMember,
                description: inputs.description,
            };
            postGroup(groupData);
        }
    };

    async function postGroup(groupData, onSuccess) {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.post(
                'https://group-project-csci4177.onrender.com/groups/createGroup',
                groupData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(response.data);
            alert('Group created successfully');
            navigate('/GroupsPage');
        } catch (error) {
            console.error('Error posting group:', error);
            if (error.response && error.response.status === 401) {
                alert('Session expired. Please log in again.');
                window.location.href = '/login';
            }
        }
    }


    return (
        <>
            <Navbar />
            <div className="container col-md-8 p-3">
                <h1 className="text-center">Create Group</h1>
                <form onSubmit={handleSubmit} className="row g-3">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Group Name:</label>
                            <input
                                className="form-control"
                                type="text"
                                name="name"
                                value={inputs.name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Invite Member:</label>
                            <input
                                className="form-control"
                                type="text"
                                name="inviteMember"
                                value={inputs.inviteMember}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Description:</label>
                            <input
                                className="form-control"
                                type="text"
                                name="description"
                                value={inputs.description}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-12 text-center">
                        <button
                            type="submit"
                            className="btn btn-primary btn-block mt-3"
                        >
                            Create Group
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CreateGroup;

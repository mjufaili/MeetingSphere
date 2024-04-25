import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function CreateActivity() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        activityName: '',
        location: '',
        attendees: '',
        description: '',
        date: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!inputs.activityName || !inputs.location || !inputs.attendees || !inputs.description || !inputs.date){
            alert("Please complete the form");
        } else {

            const activityData = {
                title: inputs.activityName,
                location: inputs.location,
                attendees: inputs.attendees.split(",").map(item => item.trim()),
                description: inputs.description,
                date: inputs.date
            };


            const token = localStorage.getItem('token');

            try {

                await axios.post('https://group-project-csci4177.onrender.com/activities/CreateActivity', activityData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                alert('Activity created successfully');
                navigate('/ActivitiesPage');
            } catch (error) {
                console.error('Error creating activity:', error);
                alert('Failed to create activity');
            }
        }
    }

    return (
        <>
        <div class="container col-md-8 text-bg-light p-3">
            <h1>Create Activity</h1>
            {/* BootStrap */}
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"></link>
            <form onSubmit={handleSubmit} class="row g-3">
            <label class="col-md-6">Activity Name:
            <br></br>
            <input 
                class="form-control"
                type="text" 
                name="activityName" 
                value={inputs.activityName || ""} 
                onChange={handleChange}
            />
            </label>
            <label class="col-md-6">Activity Location:
            <br></br>
            <input 
                class="form-control"
                type="text" 
                name="location" 
                value={inputs.location || ""} 
                onChange={handleChange}
            />
            </label>
            <label class="col-md-4">Attendees:
            <br></br>
            <input 
                class="form-control"
                type="text" 
                name="attendees" 
                value={inputs.attendees || ""} 
                onChange={handleChange}
            />
            </label>
            <label class="col-md-4">Description:
            <br></br>
            <input 
                class="form-control"
                type="text" 
                name="description" 
                value={inputs.description || ""} 
                onChange={handleChange}
            />
            </label>
            <label class="col-md-4">Date:
            <br></br>
            <input 
                class="form-control"
                type="date" 
                name="date" 
                value={inputs.date || ""} 
                onChange={handleChange}
            />
            </label>
            <div class="col-md-4"></div>
            {/* <input type="submit" class="col-md-4 btn btn-primary"/> */}
            <button type="submit" class="col-md-4 btn btn-primary">Create Activity</button>
            </form>
        </div>
        </>
    );
}

export default CreateActivity;

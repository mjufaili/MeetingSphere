import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import './css/ActivitiesPage.css';
import Navbar from "./Components/NaviBar_Dash";
import ActivityDisplay from "./Components/ActivityDisplay";
import Axios from "axios";
const ActivitiesPage = () => {
    const [activities, setActivities] = useState([]);

    //get  activities by username
    useEffect(() => {
        const fetchActivitiesByParticipant = async () => {
            try {
                const token = localStorage.getItem('token');
                //debug
                console.log("Token:", token);
                const response = await Axios.get('https://group-project-csci4177.onrender.com/activities/getByParticipants', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                //debug
                console.log('Activities Response:', response.data); 
                setActivities(response.data);
            } catch (error) {
                console.error('Error fetching activities by participant:', error);
            }
        };

        fetchActivitiesByParticipant();
    }, []);


    //delete activity by _id
    const deleteActivity = async (activityId) => {
        if (window.confirm('Are you sure you want to delete this activity?')) {
            console.log(activityId); // Debugging log
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.log('No token found, please login again.');
                    return;
                }

                // Proceed with the DELETE request
                await Axios.delete(`https://group-project-csci4177.onrender.com/activities/deleteActivity/${activityId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setActivities(currentActivities => currentActivities.filter(activity => activity._id !== activityId));

                console.log('Activity deleted successfully');
            } catch (error) {
                console.error('Error deleting activity:', error);
            }
        }
    };



    return (
        <>
            <Navbar />

            <div className="activitiesPage-background">
                <h1 className="activitiesPage-title">Activities</h1>
            </div>


            
            <div className="ca-btn-background">
                <Link to="/createActivity" className="create-activity-btn">
                    <AiOutlinePlusCircle /> Create Activity
                </Link>
            </div>
           

            <ActivityDisplay activities = {activities} deleteActivity={deleteActivity}/>

            
        

    </>
    );
};

export default ActivitiesPage;



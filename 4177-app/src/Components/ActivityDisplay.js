// This componontes can be imported to pages to display activities. 
/*
    Lingxi Dai - B00859041
*/
import React from 'react';
import { Link } from 'react-router-dom';
import './css/ActivityDisplay.css'; 

function ActivityDisplay(props) {
    //filterNext7Days will be true for Dashboard
    const {activities, filterNext7Days, deleteActivity } = props;

    

    const isInNext7Days = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // normalize today's date
        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);
        return date >= today && date < nextWeek;
    };

    const filteredActivities = filterNext7Days
        ? activities.filter(activity => {
            const activityDate = new Date(`${activity.date}T00:00:00`);
            return isInNext7Days(activityDate);
        })
        : activities;

    //handle no upcoming activity notification    
    if (filterNext7Days && filteredActivities.length === 0) {
        return <div className="activitiesContainer">No upcoming activity</div>;
    }

    // group activities by date only if filtering for the next 7 days
    const groupedActivities = filterNext7Days ? filteredActivities.reduce((acc, activity) => {
        const activityDate = new Date(`${activity.date}T00:00:00`);
        const dateString = activityDate.toISOString().split('T')[0];
        if (!acc[dateString]) {
            acc[dateString] = [];
        }
        acc[dateString].push(activity);
        return acc;
    }, {}) : null;


    //render grouped activities if filtered for the next 7 days, eles render all activities
    return (
        <div className="activitiesContainer">
            {filterNext7Days ? (
                Object.entries(groupedActivities).map(([date, activities]) => (
                    <div key={date} className="dayGroup">
                        <h3>{new Date(`${date}T00:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</h3>
                        <div className="activitiesByDate">
                            {activities.map((activity, index) => renderActivityCard(activity, index, deleteActivity))}
                        </div>
                    </div>
                ))
            ) : (
                <div className="activitiesByDate"> 
                    {filteredActivities.map((activity, index) => renderActivityCard(activity, index, deleteActivity))}
                </div>
            )}
        </div>
    );
}

//render activity card
function renderActivityCard(activity, index, deleteActivity) {
    return (
        <div key={index} className="activityCol">
            <div className="activityCard">
                <div className="cardButtons">
                    <button className="editButton">Edit</button>
                    <button onClick={() => deleteActivity(activity._id)}className="deleteButton">Delete</button>
                </div>
                <div className="activityCardBody">
                    <h5 className="activityCardTitle">
                        <Link to={`/activity/${activity._id}`} className="activityLink">{activity.title}</Link>
                    </h5>
                    <p className="activityCardText">{activity.description}</p>
                </div>
                <ul className="activityListGroup">
                <li className="activityListGroupItem"><strong>Creator:</strong> {activity.creator}</li>
                    <li className="activityListGroupItem"><strong>Location:</strong> {activity.location}</li>
                    <li className="activityListGroupItem"><strong>Date:</strong> {new Date(activity.date + "T00:00:00").toLocaleDateString()}</li>
                    <li className="activityListGroupItem"><strong>Attendees:</strong> {activity.attendees.join(', ')}</li>
                </ul>
            </div>
        </div>
    );
}


export default ActivityDisplay;

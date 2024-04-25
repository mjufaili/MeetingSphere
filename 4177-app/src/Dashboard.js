/*
    Lingxi Dai - B00859041
*/
import React, { useState,useEffect } from 'react';
import Navbar from "./Components/NaviBar_Dash";
//dummy activities for testing purpose
// import activities from "./dummy/dummyActivities";
import ActivityDisplay from "./Components/ActivityDisplay";
import './css/Dashboard.css';
//import axios
import Axios from 'axios'; 
//import search & filter
import SearchBar from './Components/SearchBar';
import Filter from './Components/Filter';


const Dashboard = () => {
    //fetched activities state
    const [activities, setActivities] = useState([]);
    //state to help search 
    const [searchQuery, setSearchQuery] = useState('');
    //state to help filter
    const [filterCriteria, setFilterCriteria] = useState({ 
        criteria: '', 
        value: '',
        startValue: '',
        endValue: ''});

    const [displayedActivities, setDisplayedActivities] = useState([]);

   

    //get  activities by username
    useEffect(() => {
        const fetchActivitiesByParticipant = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await Axios.get('https://group-project-csci4177.onrender.com/activities/getByParticipants', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setActivities(response.data);
            } catch (error) {
                console.error('Error fetching activities by participant:', error);
            }
        };

        fetchActivitiesByParticipant();
    }, []);


    useEffect(() => {
        applySearchAndFilter();
    }, [searchQuery, filterCriteria, activities]);

    
    //get search query
    const handleSearch = (query) => {
        setSearchQuery(query.toLowerCase());
    };

    //set filter criteria
    const handleFilter = (criteria, value, startDate = '', endDate = '') => {

        if (criteria === "date") {
            setFilterCriteria({ criteria, value: '', startValue: startDate, endValue: endDate || startDate });
        } else {
            // for non-date filters, only use value
            setFilterCriteria({ criteria, value, startValue: '', endValue: '' });
        }
    };

    

    //handler search and filter
    const applySearchAndFilter = () => {
        //shallow copy of activities
        let result = [...activities];

        //serach
        if (searchQuery) {
            result = result.filter(activity => 
                activity.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        
        //filter
        if (filterCriteria.criteria){

            result = result.filter(activity => {

            // convert activity.date string to a Date object or filter does not work
            const activityDate = new Date(activity.date);
    
            //filter by date
            if (filterCriteria.criteria === "date") {
                
                const startDate = filterCriteria.startValue ? new Date(filterCriteria.startValue) : null;
                const endDate = filterCriteria.endValue ? new Date(filterCriteria.endValue) : null;


                //try to cover the entire day
                //but the actual date shift. this issue is not fixed
                if (startDate) startDate.setHours(0, 0, 0, 0); 
                if (endDate) endDate.setHours(23, 59, 59, 999); 
            

                // debugging output
                console.log(`Filtering between: ${startDate} and ${endDate}`);
                console.log(`Activity Date: ${activityDate}`);
                    
                return (!startDate || activityDate >= startDate) && (!endDate || activityDate <= endDate);
            } 
            else if (filterCriteria.criteria === "location") {
                return activity.location.toLowerCase().includes(filterCriteria.value.toLowerCase());
            } 
            else if (filterCriteria.criteria === "attendees") {
                return activity.attendees.some(attendee => attendee.toLowerCase().includes(filterCriteria.value.toLowerCase()));
            }
            //if there in no activity meets the criteria
            return false;
        });
    
        }
        setDisplayedActivities(result);
    };
    
    
    
    
    return (
        <>

            <Navbar />

            <div className="dashboard-background">
                <h1 className="dashboard-title">Upcoming Activities</h1>
            </div>


            <div className="search-filter-container">
                <SearchBar onSearch={handleSearch} />
                <Filter onFilter={handleFilter} />
            </div>


            {/* handle no result */}
            {displayedActivities.length > 0 ? (
                <ActivityDisplay activities={displayedActivities} filterNext7Days={true}/>
            ) : (
                <div>No activities found</div>
            )}
        </>
    );
};
export default Dashboard;
/*
  Lingxi Dai - B00859041
*/

//The filter can filter by location, date, and attendees.It can be imported into any page of our project. 
//But the css should be modifited
import React, { useState } from 'react';
import './css/Filter.css' 

function Filter({ onFilter }) {
    const [filterBy, setFilterBy] = useState('');
    const [filterValue, setFilterValue] = useState('');
    //state to handle date range
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleFilterChange = (event) => {
        setFilterBy(event.target.value);
        //reset filter value 
        setFilterValue('');
        setStartDate('');
        setEndDate('');
    };

    const handleValueChange = (event) => {
        const newValue = event.target.value;
        setFilterValue(newValue);

        if (!newValue && filterBy !== "date") {
            //clear initial values
            onFilter('', '');
        }
    };

    //data has specific filter criteria
    const applyFilter = () => {
        if (filterBy === "date") {
            onFilter(filterBy, '', startDate, endDate);
        } else {
            onFilter(filterBy, filterValue);
        }
    };

    return (
        <div className="filter-container">
             <div className="filter-controls">
                <select value={filterBy} onChange={handleFilterChange} className="filter-select">
                    <option value="">Select Filter</option>
                    <option value="date">Date</option>
                    <option value="location">Location</option>
                    <option value="attendees">Attendees</option>
                </select>
           

                {filterBy === "date" ? (
                    <>
                        <input className="filter-input"
                            type="date"
                            value={startDate}
                            onChange={e => {setStartDate(e.target.value);
                            if(!e.target.value && !endDate){
                                onFilter('', '');
                            }}}
                           
                        />
                        <input className="filter-input"
                            type="date"
                            value={endDate}
                            onChange={e => {setEndDate(e.target.value);
                                if(!e.target.value && !startDate){
                                    onFilter('', '');
                                }}}
                            
                            placeholder="End Date"
                        />
                    </>
                ) : (
                    // non-date filter input
                    <input className="filter-input"
                        type="text"
                        placeholder={`Enter ${filterBy}`}
                        value={filterValue} 
                        onChange={handleValueChange}
                        disabled={!filterBy} //disable input if there is no filter criteria
                    />
                )}

                <button onClick={applyFilter} className="filter-button">Apply Filter</button>
        </div>
    </div>
    );
}

export default Filter;

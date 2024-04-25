var express = require('express');
var router = express.Router();
const { Activity } = require('../models/Activity')
const authenticateToken = require('../Auth/authenticateToken');

const ObjectId = require('mongodb').ObjectId;


router.post('/CreateActivity', authenticateToken, async (req, res, next) => {

    const username = req.user.username;


    const { title, location, attendees, description, date } = req.body;

    try {
        const newActivity = await Activity.create({
            title,
            location,
            attendees,
            description,
            date,
            creator: username
        });
        res.status(201).json({
            code: 201,
            message: 'Activity Created successfully',
            activity: {
                title: newActivity.title,
                location: newActivity.location,
                attendees: newActivity.attendees,
                description: newActivity.description,
                date: newActivity.date,
                creator: newActivity.creator
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while creating the activity.' });
    }
});


//For testing purpose: get all activities
router.get('/getAllActivities',authenticateToken, async (req, res, next) => {
    try {
        const activities = await Activity.find();
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ message: "Error fetching activities", error: error.message });
    }
});



//get avtivities where the username matches the activity creator or any name in the array of attendees
router.get('/getByParticipants',authenticateToken, async (req, res) => {
    if (req.user.username) {
        const username = req.user.username; // get username from session
        try {
            const activities = await Activity.find({
                $or: [
                    { creator: username },
                    { attendees: username }
                ]
            });
            res.json(activities);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    } else {
        res.status(403).json({ message: "User not logged in" });
    }
});




//testing: get by _id
router.get('/getActivityById/:activityId', authenticateToken, async (req, res) => {
    try {
        //const {activityId} = req.params;
        //debug
        console.log("Activity ID: ", activityId);
        const activityId = '660f4d2ac248222f53315507'

        const activity = await Activity.findById(activityId);

        if (activity) {
            res.status(200).json(activity);
        } else {
            res.status(404).json({ message: "Activity not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error finding the activity", error: error.message });
    }
});


//delete activities by _id
router.delete('/deleteActivity/:activityId', authenticateToken, async (req, res) => {
    try {
        const _id = req.params.activityId;
        console.log("Activity ID: ", _id);
        const result = await Activity.findByIdAndDelete(_id);

        if (result) {
            // Use _id instead of activityId
            res.status(200).json({ message: "Activity successfully deleted", _id: _id });
        } else {
            res.status(404).json({ message: "Activity not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting activity", error: error.message });
    }
});



module.exports = router;

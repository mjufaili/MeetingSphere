// profileRoutes.js
// Author: Kaiyang Hu
// B number: B00871238
// This module defines routes for managing user profiles,
// including updating profiles and checking for or creating profiles if they don't exist.
// JWT authentication ensures that these operations are secure and user-specific.



var express = require('express');
var router = express.Router();
var ProfileInfo = require('../models/profileInfo');
var User = require('../models/UserS');
const authenticateToken = require('../Auth/authenticateToken');


router.put('/update', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;

        let profile = await ProfileInfo.findOneAndUpdate({user: userId}, req.body, { new: true, upsert: true });
        res.send(profile);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'An error occurred while updating your profile.' });
    }
});


router.post('/check-and-create', authenticateToken, async (req, res) => {
    try {

        const userId = req.user.id;

        let profile = await ProfileInfo.findOne({user: userId});
        if (!profile) {
            const user = await User.findById(userId);

            const newProfile = new ProfileInfo({
                user: userId,
                username: user.username,
                email: user.email,
                firstName: 'default',
                lastName: 'default',
                organization: 'default',
                location: 'default',
                phone: 'default',
                birthday: '9999-12-31'
            });

            await newProfile.save();
            res.send(newProfile);
        } else {
            res.send(profile);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'An error occurred while checking your profile.' });
    }
});

module.exports = router;



module.exports = router;



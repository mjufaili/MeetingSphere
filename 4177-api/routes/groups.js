const express = require('express');
const router = express.Router();
const { Group } = require('../models/group');
const authenticateToken = require('../Auth/authenticateToken');
// POST /api/groups/createGroup - Create a new group
router.post('/createGroup', authenticateToken, async (req, res) => {
    try {
        const { name, inviteMember, description } = req.body;
        const userId = req.user.id;

        const newGroup = await Group.create({
            name,
            inviteMember,
            description,
        });

        res.status(201).json({
            code: 201,
            message: 'Group created successfully',
            group: {
                name: newGroup.name,
                inviteMember: newGroup.inviteMember,
                description: newGroup.description,
            }
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: 'Failed to create group',
            error: error.message
        });
    }
});


// GET /api/groups - Get all groups
router.get('/', authenticateToken, async (req, res) => {
    try {
        const groups = await Group.find(); // .find({ creator: req.user.id });
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

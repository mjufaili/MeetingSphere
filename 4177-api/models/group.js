const mongoose = require('../database/db');

const groupSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    inviteMember: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
});

const Group = mongoose.model('Group', groupSchema);
module.exports = { Group };
const { mongoose } = require('../database/db');

const activitySchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
    },
    creator:{
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    //attendees should be an array of names
    attendees: {
        type:[String],
        required: false
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
})

const Activity = mongoose.model('Activity', activitySchema)
module.exports = { Activity }

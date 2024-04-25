// Author: Kaiyang Hu
// B number: B00871238
// This file defines the schema for user profiles in the database using Mongoose.
// It includes user reference, personal and contact information. Ensures unique user profiles through reference.
const mongoose = require('../database/db');

const ProfileSchema  = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserSignup',
        unique: true,
        required: true
    },
    username: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    organization: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    birthday: {
        type: Date,
        required: false
    }
});

const ProfileInfo = mongoose.model('Profile', ProfileSchema);
module.exports = ProfileInfo;


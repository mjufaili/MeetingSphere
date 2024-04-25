/**
 * Mongoose model for the UserSignup schema.
 *
 * Author: Al-Mahana Mahmood Al-Jufaili
 * B00858788
 * Defines the schema for the UserSignup collection within the database, specifying the structure and constraints
 * for user records. Each user has a unique username and email, both of which are required, as well as a password.
 *
 * This schema is used to perform operations such as creating new user records and querying existing ones
 * in the context of user registration and authentication processes.
 *
 * @file UserS.js - Defines the UserSignup model and schema for MongoDB.
 * @requires mongoose - Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
 *                      It manages relationships between data, provides schema validation, and is used to translate
 *                      between objects in code and the representation of those objects in MongoDB.
 *
 * @module UserSignup - The Mongoose model for the UserSignup schema, exported for use in other parts of the application.
 */


const mongoose = require('../database/db');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const UserSignup = mongoose.model('UserSignup', userSchema);

module.exports = UserSignup;

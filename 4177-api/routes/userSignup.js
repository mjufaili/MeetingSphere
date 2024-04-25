/**
 * Author: Al-Mahana Al-Jufaili
 * b00858788
 * API routes for user authentication including user registration (sign-up) and user login (sign-in).
 *
 * The /signup endpoint registers a new user by taking a username, email, and password,
 * checking for existing users with the same username or email to prevent duplicates,
 * and saving the new user to the database if no duplicates are found.
 *
 * The /signin endpoint authenticates a user by taking an email and password,
 * checking if a user with the given email exists and if the provided password matches the stored password.
 * On successful authentication, it returns user details.
 *
 * Errors during either process are handled gracefully, returning appropriate HTTP status codes and error messages.
 *
 * @file userSignup.js
 * @requires express - Express is a minimal and flexible Node.js web application framework
 *                     that provides a robust set of features for web and mobile applications.
 * @requires UserSignup - The model representing the user schema in the database.
 * @module router - Express Router to handle user authentication routes.
 */



var express = require('express');
var router = express.Router();
var UserSignup = require('../models/UserS');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const authenticateToken = require("../Auth/authenticateToken");


const JWT_SECRET = 'your_jwt_secret';


router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await UserSignup.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists.' });
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await UserSignup.create({ username, email, password: hashedPassword });


        const token = jwt.sign({
            id: newUser._id,
            username:newUser.username

        }, JWT_SECRET, {
                expiresIn: '24h'
            });

        res.status(201).json({ token, message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user.' });
    }
});


router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserSignup.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log( isMatch);
        if (!isMatch && password !== user.password) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username
            },
            JWT_SECRET,
            {
                expiresIn: '24h'
            });

        res.json({ token, message: 'User signed in successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error signing in.' });
    }
});

router.get('/getUsername', authenticateToken, async(req, res) => {

    const user = await UserSignup.findById(req.user.id);
    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }
    res.json({ username: user.username });
});

module.exports = router;


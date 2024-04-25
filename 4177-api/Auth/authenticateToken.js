// authenticateToken.js
// Author: Kaiyang Hu
// B number: B00871238
// This file implements JWT authentication middleware using jsonwebtoken.
// It verifies tokens provided in Authorization headers and grants access based on token validity.

const jwt = require('jsonwebtoken');
const JWT_SECRET ='your_jwt_secret';

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;


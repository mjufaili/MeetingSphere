// Andrew Cole
var express = require('express');
var router = express.Router();
var ProfileInfo = require('../models/profileInfo');
var User = require('../models/UserS');
const authenticateToken = require("../Auth/authenticateToken");

router.get('/',authenticateToken, async(req, res) => {
    const { query } = req.query
    const results = await ProfileInfo.find({
        "$expr": {
          "$regexMatch": {
            "input": { "$concat": ["$firstName", " ", "$lastName"] },
            "regex": query,
            "options": "i"
          }
        }
      }).select("user username firstName lastName")
    res.send({
        code: 200,
        data: results
    })
});


module.exports = router;



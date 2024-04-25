// db.js
// Author: Kaiyang Hu
// B number: B00871238
// This file establishes a connection to the MongoDB database using mongoose.
// It logs the connection status, including errors and disconnections.


const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://group21:13579@project01.0ktiald.mongodb.net/?retryWrites=true&w=majority&appName=Project01");

const db = mongoose.connection;

db.on('error',error=>{
    console.warn('connect failed！', error)
});
db.once('connected', ()=> {

    console.log('Connect success！')
});
db.on('disconnected', ()=> {
    console.log("Database disconnected！");
});

module.exports = mongoose;

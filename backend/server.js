// //importing express module
// const express =  require('express');

// //load env variables
// require('dotenv').config();

// //calling express function
// const app=require("./app");

// //importing database connection
// const connectDB = require("./config/db");

// //connect to database
// connectDB();

// //middleware to parse JSON bodies
// app.use(express.json());

// //defining a route for root URL
// app.get('/',(req,res) => {
//     res.send('Hello World!!!');
//     });

//  //define port 
//  const PORT = process.env.PORT;   

//  //start the server and listen on the defined port
//  app.listen(PORT,() => {
//     console.log(`Server is running on port ${PORT}`)
//  });

require("dotenv").config();

const app = require("./app");

const connectDB = require("./config/db");

connectDB();

const PORT = process.env.PORT || 3000;

module.exports = app;

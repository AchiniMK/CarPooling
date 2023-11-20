const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const connectDb = require('./db.js');
require('dotenv').config();
const PORT = process.env.SERVER_PORT || 3000;

//===============================
const userRoute = require('./route/UserRoute.js')
const vehilceRoute = require('./route/VehicleRoute.js')
const orgRoute = require('./route/OrgRoute.js')
const reviewRoute = require('./route/ReviewRoute.js')
const rideRoute = require('./route/RideRoute.js')
const rideRequestRoute = require('./route/RideReqRoute.js')
//const usersRoute = require('./route/signupLogin.js')
//===============================

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


// parse application/json
app.use(bodyParser.json())
app.use('/api/v1/users', userRoute);   //http://localhost:3000/api/v1/users/save-user(POST)
app.use('/api/v1/vehicles', vehilceRoute); 
app.use('/api/v1/organizations', orgRoute);
app.use('/api/v1/reviews', reviewRoute); 
app.use('/api/v1/rides', rideRoute); 
app.use('/api/v1/ride-requests', rideRequestRoute);  
//app.use('/api/v1/clients', usersRoute);




connectDb()
    .then(()=>{
        console.log('db connection succeeded.');
        app.listen(PORT,
            ()=>console.log(`Server running on port: http://localhost:${PORT}`));
    })
    .catch(err =>console.log(err));

  //===================================
 /* app.use('/', (req,resp,next)=>{
 resp.send('<h1>Server works</h1>');
  })*/
 
  //===================================
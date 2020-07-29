const path = require('path');
const express = require('express');

const app = express();

//link to routes
const userRoutes = require('./routes/userRoutes');

//set route
app.use('/api/v1/users', userRoutes);

module.exports = app;

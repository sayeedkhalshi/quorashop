const path = require('path');
const express = require('express');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

//link to routes
const userRoutes = require('./routes/userRoutes');

//body parser
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

//set route
app.use('/api/v1/users', userRoutes);

//global error handler
app.use(globalErrorHandler);

module.exports = app;

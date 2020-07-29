const mongoose = require('mongoose');
const dotenv = require('dotenv');

//set environment configurations
dotenv.config({ path: './config.env' });

//import app.js
const app = require('./app');

//connect mongoose
const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log('db connected'));

//start server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, console.log(`Sever started at port: ${PORT}`));

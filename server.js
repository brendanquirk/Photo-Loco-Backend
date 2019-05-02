//Dependencies
const express = require('express');
const App = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const photoRoutes = express.Router();
const PORT = 4000;

let Photo = require('./photo-model.js');

//Middleware
App.use(cors());
App.use(bodyParser.json());

//Connections

mongoose.connect('mongodb://127.0.0.1:27017/photos', {useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB connection established successfully');
});

App.use('/photos');

App.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});

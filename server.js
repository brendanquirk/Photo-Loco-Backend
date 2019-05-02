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

App.use('/photos', photoRoutes);

//Routes
photoRoutes.route('/').get((req, res) => {
  Photo.find((err, photos) => {
    if(err){
      console.log(err);
    } else {
      res.json(photos)
    }
  })
})

photoRoutes.route('/:id').get((req, res) => {
  let id = req.params.id;
  Photo.findById(id, (err, photo) => {
    res.json(photo);
  });
});

photoRoutes.route('/add').post((req, res) => {
  let photo = new Photo(req.body);
  photo.save().then(photo => {
    res.status(200).json({'photo': 'photo added successfully'});
  });
});

photoRoutes.route('/update/:id').post((req, res) => {
  Photo.findById(req.params.id, (err, photo) => {
    if (!photo) {
      res.status(404).send('data is not found');
    } else {
      photo.photo = req.body.photo;
      photo.description = req.body.description;

      photo.save().then(photo => {
        res.json('Photo Updated');
      })
      .catch(err => {
        res.status(400).send("Update Not Successful");
      });
    };
  });
});

//Connections

mongoose.connect('mongodb://127.0.0.1:27017/photos', {useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB connection established successfully');
});

App.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});

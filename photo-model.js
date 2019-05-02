const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Photo = new Schema({
  photo: {
    type: String
  },
  description: {
    type: String
  }
});

module.exports = mongoose.model('Photo', Photo);

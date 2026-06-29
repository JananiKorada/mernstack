const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  course: String, 
  email: String,
  skills: String
});

module.exports = mongoose.model('Student', studentSchema);
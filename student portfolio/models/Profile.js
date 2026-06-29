
const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: String,
  email: String,
  bio: String,
  skills: [String],
  github: String,
  linkedin: String
});

module.exports = mongoose.model("Profile", profileSchema);

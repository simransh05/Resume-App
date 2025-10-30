const mongoose = require('mongoose')

const resumeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  bio: String,
  education: String,
  skills: [String],
  projects: [
    {
      title: String,
      description: String,
      duration: String,
    }
  ],
  experience: [String],
  dob: String,
});

module.exports = mongoose.model('Resume',resumeSchema)
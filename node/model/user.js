const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20
  },
  telephone: {
    type: Number,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
})

const User = mongoose.model('User', userSchema)

module.exports = {User}
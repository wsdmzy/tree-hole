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
    required: true,
    minlength: 11,
    maxlength: 11
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
})

const User = mongoose.model('User', userSchema)

module.exports = {User}
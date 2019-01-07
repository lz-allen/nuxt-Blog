const mongoose = require('mongoose')

const friendsSchema = mongoose.Schema({
  name: String,
  email: String,
  website: String,
  image: String,
  desc: String,
  power: String
})

module.exports = mongoose.model('friends', friendsSchema)
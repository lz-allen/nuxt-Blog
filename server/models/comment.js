const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
  noteId: String,
  name: String,
  email: String,
  content: String,
  image: String,
  time: Date,
  pid: String,
  isVisible: Boolean,
  power: String
})

module.exports = mongoose.model('comment', commentSchema)
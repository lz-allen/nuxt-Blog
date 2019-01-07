const mongoose = require('mongoose')

const productionSchema = mongoose.Schema({
  title: String,
  time: String,
  type: String,
  website: String,
  image: String
})

module.exports = mongoose.model('productions', productionSchema)
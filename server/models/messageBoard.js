const mongoose = require('mongoose')

const messageBoardSchema = mongoose.Schema({
    name: String,
    email: String,
    website: String,
    time: Date,
    content: String,
    image: String,
    power: String,
    pid: String,
    isVisible: Boolean
})

module.exports = mongoose.model('messageBoard', messageBoardSchema)
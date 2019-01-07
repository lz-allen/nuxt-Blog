const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
    type: String,
    title: String,
    desc: String,
    textVal: String,
    src: String,
    markdown: String,
    publishTime: Date,
    total: Number,
    isVisible: Boolean
})

module.exports = mongoose.model('blog', articleSchema)
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const articleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: String,
    author: {
        type: String,
        required: true
    },
    state: {
        type: String,
        default: 'draft', 
        enum: ['draft','published']
    },
    readCount: {
        type: Number,
        default: 0
    },
    readingTime: Number,
    tags: ['Strings']
})

module.exports = mongoose.model('Article', articleSchema)
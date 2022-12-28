const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: String
    },
    state: {
        type: String,
        default: 'draft', 
        enum: ['draft','published']
    },
    readcount: {
        type: Number,
        default: 0
    },
    readingTime: String,
    tags: [{
        type: 'String'
    }],
    timestamp: {
        createdAt: {type: Date, default: Date.now()}
    }
})

const articleModel = mongoose.model('articles', BlogSchema)

 module.exports = articleModel;
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const postSchema = new Schema({
    news_title:{
        type: String,
        required: true, 
    },
    news_about:{
        type: String,
        required: true
    },
    news_desc:{
        type: String,
        required: true
    },
    news_type:{
        type: String,
        required: true
    },
    news_img:{
        data: Buffer,
        contentType: String,
    },
},{timestamps: true});


module.exports = model('news_posts', postSchema);
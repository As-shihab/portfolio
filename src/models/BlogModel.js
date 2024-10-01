const DB = require("../Config/db");
const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: {type:'string' , default:null},
    blogfile : {type:'string' , default: null},
    content : {type: 'string' , default: null},
    imgid :{type:'string' , default: null}
}, {timestamps: true})

const BlogModel = mongoose.model('blogs' , BlogSchema)

module.exports = BlogModel;
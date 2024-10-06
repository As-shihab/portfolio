
const mongoose = require('mongoose');

const PorjectSchema = new mongoose.Schema({
    title: {type:'string' , default:null , required: true},
     language: {type:'string' , default:null , required: true},
    style: {type:'string' , default:null , required: true},
    database: {type:'string' , default:null , required: true},
    repolink: {type:'string' , default:null , required: true},
    livelink: {type:'string' , default:null , required: true},
    bloglink: {type:'string' , default:null},
    photos: {type: 'string' , default: null},
    desc:{type:'string' , default: null}

},{timestamps:true})

const ProjectModel = mongoose.model('project' , PorjectSchema)
module.exports = ProjectModel
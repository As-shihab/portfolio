const DB = require("../Config/db");
const mongoose = require('mongoose')

const AdminUser = new mongoose.Schema({
    email: {type:'String' , required:true , unique: true},
    admin : {type : 'String' , required: false, default: null } ,
    mobile: {type : 'String', default: null , unique: true},
    logincode: {type: 'String' , required: false , default: null},
   
},{timestamps:true})
const AdminModel = mongoose.model('adminuser' , AdminUser);
module.exports = AdminModel;





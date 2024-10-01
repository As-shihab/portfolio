const DB = require("../Config/db");
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {type:'string' , required:true},
    email: {type: 'string' , required: true , unique: true},
    password: {type: 'string', required: true},
    active: {type: 'bool' , default: false},
    otp: {type: 'string' , default: null}
})

const UserModel = mongoose.model('Guyst' , UserSchema)

module.exports = UserModel

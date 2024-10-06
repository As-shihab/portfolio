const mongoose = require("mongoose")
require('dotenv').config();
const DB = mongoose.connect(`mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOATPASS}@cluster0.ipv4i12.mongodb.net/shihab`)
.then(res=>{
    console.log('Mongodb Connected'+res)
})
.catch((err)=>{
    console.log("Somthing went error to connect  db  " + err.message)
})


module.exports = DB;



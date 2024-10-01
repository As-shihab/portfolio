const express = require('express');
const { NewAdmin , GetAdmin, VerifyCode, VerifyToken, AdminData } = require('../controllers/AdminController');
const admin = express.Router()

admin.post('/newadmin' , NewAdmin)
// get admin
admin.post('/getadmin' , GetAdmin)
admin.post('/verifycode' , VerifyCode)
admin.get('/verifytoken' , VerifyToken)
admin.get('/admindata' , AdminData);

module.exports = admin;



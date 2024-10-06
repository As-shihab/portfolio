const express = require('express')
const { CreateBlog, GetBlogs, PutBlogs, DeleteBlog , GetOneBlog, GetPined, MakePined} = require('../controllers/BlogController')
const {CreateGuyst , GetGuyst  , UpdateGuyst , DeleteGuyst , IsGuyst, GetCode, VerifyCode, LoginGuyst} = require('../controllers/GuystController')
const shihab = express.Router()
const multer = require('multer')
const path = require('path')
const VerifyUser = require('./middleware/UserMiddleware')
const Cloud  = require('../cloud/gcloud')
const DelGfile = require('../cloud/DelFile')
const { NewProject, GetAllProject } = require('../controllers/ProjectController')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "Uploads")
    },
    filename: function (req, file, cb) {
        const dataname = Math.floor(200000000 + Math.random() * 900000);
        const actual = dataname + "file" + path.extname(file.originalname)
        cb(null, actual)
        req.body.blogfilename = actual
        req.body.newfile = actual
    } 
})
const upload = multer({ storage: storage })

shihab.post('/blog', upload.array('blogfile'),Cloud, CreateBlog)
shihab.get('/blogs', GetBlogs)
shihab.put('/blog', PutBlogs)
shihab.delete('/blog/:id',DelGfile, DeleteBlog)
shihab.get('/blog/:id' , GetOneBlog)
shihab.get('/pinedblog' , GetPined)
shihab.put('/makepined/:id' , MakePined)

// guyst router

shihab.post('/guyst', CreateGuyst);
shihab.get('/guyst/:id', GetGuyst)
shihab.put('/guyst/:id', UpdateGuyst)
shihab.delete('/guyst/:id', DeleteGuyst)
shihab.get('/isguyst' , VerifyUser, IsGuyst)
shihab.post('/guyst/sentcode' , VerifyUser , GetCode)
shihab.post('/guyst/verifycode' , VerifyUser , VerifyCode)
shihab.post('/guyst/login' , LoginGuyst)
// end guyst router





// project routers

shihab.post('/project/newproject', upload.array('photos') , Cloud , NewProject )
shihab.get('/project/getprojects' , GetAllProject)

module.exports = shihab



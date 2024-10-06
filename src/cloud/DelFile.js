
const {google} =require('googleapis');
const fs = require('fs');
const BlogModel = require('../models/BlogModel');

const DelGfile = async (req ,res ,next) =>{
       const {id} =req.params
try{

    const auth = new google.auth.GoogleAuth({
        credentials:{
            "type": process.env.TYPE,
            "project_id": process.env.PROJECT_ID,
            "private_key_id":process.env.PRIVATE_KEY_ID,
            "private_key":process.env.PRIVATE_KEY ,
            "client_email": process.env.CLIENT_EMAIL,
            "client_id": process.env.CLIENT_ID,
            "auth_uri": process.env.AUTH_URI,
            "token_uri": process.env.TOKEN_URI,
            "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER,
            "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL,
            "universe_domain": process.env.UNIVERS_DOMAIN
        },
        scopes: ['https://www.googleapis.com/auth/drive']
    })
    
    const drive = google.drive({
        version:'v3',
        auth:auth
    })

      await BlogModel.findOne({_id: id})
      .then(blog=>{
      
        if(blog){
            drive.files.delete({
                fileId: blog.imgid
            })
            
            next()
            
        }
 

        

      })
      .catch(error=>{
        console.log(error)
        return res.json({msg: error.message})})
}

catch(err){
    console.log(err.message)
    return res.json({msg: err.message})
}




}

module.exports = DelGfile
const fs = require('fs')
const { google } = require('googleapis')
const path = require('path')



const Cloud = async (req, res, next) => {


    try {
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
                }
          ,
            
            scopes: ['https://www.googleapis.com/auth/drive']
        })

        const drive = google.drive({
            version: 'v3',
            auth: auth
        })
        const UploadedFile = []
        for (let i = 0; i < req.files.length; i++) {

            const cloud = await drive.files.create({
                requestBody: {
                    name: req.files[i].filename,
                    mimeType: req.files[i].mimetype,
                    parents: ['1TCIq7xQ2JdjjtQCzl8q8aCldDExceW6C']

                },

                media: {
                    body: fs.createReadStream(req.files[i].path)
                }


            })
            UploadedFile.push(cloud.data)
             req.cloud = cloud.data

        }
          req.imgid= UploadedFile[0].id
         
          
          
       next()

    }

    catch (err) {
        console.log(err.message)
        return res.json({ msg: err.message })
    }



}


module.exports = Cloud
const UserModel = require("../models/UserModel")
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");
const GetGuyst = async (req, res) => {
    const { id } = req.params
    const user = await UserModel.find({ _id: id })
    if (user) {
        return res.json({
            user: user,
            code: 200
            , get: true
        })
    }

}

const DeleteGuyst = async () => {
    const { id } = req.params
    const delete_user = await UserModel.deleteOne({ _id: id })
    if (delete_user) {
        return res.json({
            code: 200,
            user: true,
            del: true
        })
    }
    else {
        return res.json({
            code: 400,
            del: false,
            user: false
        })
    }


}

const PutGuyst = async () => {

}

const CreateGuyst = async (req, res) => {

    try {
        const NewGuyst = await UserModel.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        if (NewGuyst) {

            const FindUser = await UserModel.find({ _id: NewGuyst._id })
            if (FindUser) {

                const token = await jwt.sign({ exp: Math.floor(Date.now() / 1000) + 60 * 60 * 60, data: { email: NewGuyst.email, _id: NewGuyst._id } }, 'welcometoshihabcloud')

                return res.json({
                    msg: 'User created successfullly',
                    code: 200,
                    nuser: true,
                    token: token

                })
            } else {
                return res.json({msg: "User Not verifyd"});
            }

        }

        return res.json({msg:'Somthing went eror in server'})
    }
    catch (err) {
        return res.json({ msg: err.message, code: 405, guyst: false })
    }


}

const UpdateGuyst = async (req, res) => {
    const { id } = req.params
    await UserModel.updateOne({ _id: id }, { $set: { name: req.body.name, email: req.body.email } },
        function (err, res) {
            if (err) throw new err;
            return res.json({
                update: true,
                msg: res,
                code: 200
            })
        }
    )
}

const IsGuyst = async (req, res) => {
    const email = req.email;
    const id = req._id;
     const user = await UserModel.find({_id: id , email: email})
     if(user[0]){
        return res.json({
            name: user[0].name ,
            email: user[0].email,
            user: true,
            active: user[0].active

        })
     }
 
     return res.json({user:false , msg:'No User Found'})
  

}

// get code

const GetCode = async (req ,res) =>{
    let randomcode = Math.floor(100000+ Math.random() * 9000000)
    const html_format = `<div>
        <h1>Welcome to Shihab Cloud!</h1><br/>
                        <font>Hi , i'm shihab . i've sent you an otp code right here , please don't share this to anyone . this may assist you stay encrypted</font><br/>

                        <h2>${randomcode}</h2><br/>
                        <h1>Sincarely</h1>
                        <span>As-shiab</span>
    </div>`;

    const id = req._id

     try {
      
     const transporter = nodemailer.createTransport({
  host:"smtp.gmail.com",
    port : 465,
    secure: true,
    auth: {
    user: "html.shihab@gmail.com",
    pass: 'ebxmxouucxldzcdu'
    }, });
    
    await transporter.sendMail({
     from:'html.shihab@gmail.com',
     to: req.email,
    subject: "As Shihab connection verification",
    html: html_format });
    await UserModel.updateOne({_id: id} , {$set: {otp: randomcode}})
    return res.json({
        sent: true,
        user_id: req._id,
        msg: "Otp code successfully sent"
    })
    } catch (error) {
     return res.json({msg: error.message})
    
    
    };
}

// verify code
const  VerifyCode = async(req  ,res)=>{
     const code = req.body.code;
     const id = req._id;

   const codemailer=  await UserModel.find({_id: id})
   if(codemailer[0].otp == code){
       await UserModel.updateOne({_id: id} , {$set: {active: true}})
       
       return res.json({verify: true , msg:"User verifyd successfully"})
   }

   return res.json({
    msg: "Code doesn't match",
    verify: false
   })


}


// login guyst

const LoginGuyst = async(req ,res) =>{
   const user= await UserModel.find({email: req.body.email , password: req.body.password})
       
   if(user[0]){
    const token = await jwt.sign({ exp: Math.floor(Date.now() / 1000) + 60 * 60 * 60, data: { email: user[0].email, _id:user[0]._id } }, 'welcometoshihabcloud')
    return res.json({msg: "Welcome again!" , user: true , token: token?token:null})
   }
    return  res.json({user:false , msg: 'No user found' , token:false})

}

module.exports = { GetGuyst, DeleteGuyst, PutGuyst, CreateGuyst, UpdateGuyst, IsGuyst , GetCode , VerifyCode ,LoginGuyst }
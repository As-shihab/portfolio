const AdminModel = require("../models/AdminModel")
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken')
const NewAdmin = async (req, res) => {

    try {
        await AdminModel.create({
            email: req.body.email,
            admin: req.body.admin,
            mobile: req.body.mobile
        })
            .then(isok => {
                res.json(isok)
            })
    }
    catch (err) {
        res.json({ msg: err.message })
    }

}
// get admin
const Code = [];
const GetAdmin = async (req, res) => {
    let randomcode = Math.floor(100000 + Math.random() * 900000)

    try {
        const userid = await AdminModel.find({ email: req.body.email })
        if (userid == "") {
            res.json({
                msg: "User not found"
            })
        }
        else {
            if (userid[0]._id) {
                let randomcode = Math.floor(100000 + Math.random() * 9000000)
                const sentCode = await AdminModel.updateOne({ _id: userid[0]._id }, { $set: { logincode: randomcode } });
                if (sentCode.acknowledged == true) {
                    const transpormer = await nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 465,
                        secure: true,
                        auth: {
                            user: 'html.shihab@gmail.com',
                            pass: 'ebxmxouucxldzcdu'
                        }
                    })

                    await transpormer.sendMail({
                        to: 'study.shihab@gmail.com',
                        subject: "As-shihab.verification",
                        html: `<h1>Hi there! welcome to shihab cloud </h1>  <font> the admin verification code is <br/> ${randomcode} <br/> however do not share this to anyone  </font> <br/>
                <b><h1>Regrad</h1></b> <br/> <span>shihab <br/> Thanks </span>`
                    })
                }
                Code.push(JSON.stringify(randomcode), userid[0]._id)
                res.json({ msg: 'Email sent successfully', otp: true, code: Code[0], Id: Code[1] })
            }
        }

    }
    catch (err) {
        res.json({
            msg: err.message
        })
    }


}
const VerifyCode = async (req, res) => {
    const getcode = await AdminModel.findOne({ _id: Code[1] })

    if (getcode.logincode === req.body.code) {
        try {
            async function Login() {
                await AdminModel.updateOne({ _id: Code[1] }, { $set: { logincode: null } })
                const token = await jwt.sign({ exp: Math.floor(Date.now() / 1000) + 60 * 60 * 60, data: Code[1] }, 'welcometoshihabcloud')
                res.json({ msg: "Succesfully Logedin", login: true, token: token ? token : null })
            }
            Login()
        } catch (err) {

            res.json({ msg: "Coudn't Login", login: false })
        }
    } else {
        res.json({ msg: "Code doesn't match", login: false })
    }

}
const VerifyToken = async (req, res) => {

    if (req.headers['admintoken']) {
        const decoded = jwt.verify(req.headers['admintoken'], "welcometoshihabcloud")
        if (decoded) {
            return res.json({ admin: true, verify: true })
        }
    }
    res.json({ admin: false, verify: false })

}
const AdminData = async () => {
    const admin = await AdminModel.find({})
    if (admin) {
        return res.json({ data: admin, admin: true })
    }
    else {
        return res.json({ data: null, admin: false })
    }
}

module.exports = { NewAdmin, GetAdmin, VerifyCode, VerifyToken, AdminData } 
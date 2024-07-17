const jwToken = require("../helpers/tokenForVarified")
const UserModel = require("../models/userModel")
const bcrypt = require('bcrypt');

let loginController = async (req, res) => {
    try {
        let { email, password } = req.body

        let existingEmail = await UserModel.findOne({ email: email })
        if (!existingEmail) {
            return res.status(400).json({
                message: "The Email is not valid in any accounts"
            })
        }
        let passCheck = await bcrypt.compare(password, existingEmail.password)
        if (!passCheck) {
            return res.status(400).json({
                message: "invalid credentials"
            })
        }
        let token = jwToken({ id: existingEmail._id.toString() }, "7d")
        res.send({
            id: existingEmail._id,
            userName: existingEmail.userName,
            fName: existingEmail.fName,
            lName: existingEmail.lName,
            profilePicture: existingEmail.profilePicture,
            token: token,
            varified: existingEmail.varified,
            message: "login Success"
        })

    } catch (err) {
        res.status(401).json({
            message: err.message 
        })
    }
}

module.exports = loginController
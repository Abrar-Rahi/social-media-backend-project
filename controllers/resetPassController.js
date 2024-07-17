
const userModel = require('../models/userModel');


const resetPassController = async (req,res) => {
  try {
    const {email }= req.body
    const existingEmail = await userModel.findOne({email}).select("-password")
    if(!existingEmail){
        return res.status(400).json({
            message : "This Email is Not Exist. try valid Email"
        })
    }
     res.status(200).json({
        email : existingEmail.email,
        profilePicture : existingEmail.profilePicture
    })
    
    
  } catch (err) {
    res.status(400).json({
        message : err.message
    })
  }
}

module.exports = resetPassController
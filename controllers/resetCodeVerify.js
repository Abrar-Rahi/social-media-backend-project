

const resetCodeModel = require('../models/resetCodeModel');
const userModel = require('../models/userModel');


const resetCodeVerify = async (req, res) => {
  try {
    const { email,resetCode } = req.body
    const user = await userModel.findOne({ email }).select("-password")
    const decode = await resetCodeModel.findOne({ user: user._id })
    if(decode.resetCode !== resetCode){
        return res.status(404).json({
            message: "Code doesn't matched"
          })
    }

     res.status(200).json({
      message: "Code matched"
    })


  } catch (err) {
    res.status(400).json({
      message: err.message
    })
  }
}

module.exports = resetCodeVerify
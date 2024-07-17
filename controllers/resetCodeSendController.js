
const genarateCode = require('../helpers/genarateCode');
const { sentResetPasswordCode } = require('../helpers/mailer');
const resetCodeModel = require('../models/resetCodeModel');
const userModel = require('../models/userModel');


const resetCodeSendController = async (req, res) => {
  try {
    const { email } = req.body
    const user = await userModel.findOne({ email }).select("-password")
    await resetCodeModel.findOneAndDelete({ user: user._id })
    const code = genarateCode(5)
    const saveCode = await new resetCodeModel({
      resetCode: code,
      user: user._id
    })
    saveCode.save()
    sentResetPasswordCode(user.email, user.fName, code)
     res.status(200).json({
      message: "Reset Code Sent To Your Email please Check"
    })


  } catch (err) {
    return res.status(400).json({
      message: err.message
    })
  }
}

module.exports = resetCodeSendController
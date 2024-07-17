
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');



const changePasswordController = async (req, res) => {
  try {
    const { email, password } = req.body
    const encriptedPassword = await bcrypt.hash(password,10)
    await userModel.findOneAndUpdate({email}, {password : encriptedPassword})
    
     res.status(200).json({
      message: "Password Update Successfully Done"
    })


  } catch (err) {
    return res.status(400).json({
      message: err.message
    })
  }
}

module.exports = changePasswordController
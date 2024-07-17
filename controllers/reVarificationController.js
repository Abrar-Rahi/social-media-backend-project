
const userModel = require('../models/userModel');
const { sendVarifiedEmail } = require('../helpers/mailer');
const jwToken = require('../helpers/tokenForVarified');


const reVarificationController = async (req,res) => {
  try {
    const id = req.user.id
    const user = await userModel.findById(id)
    if(user.varified === true){
        return res.status(400).json({
            message : "This Account is Alredy Activated"
        })
    }
    const tokenEmailVarification = jwToken({id : user._id.toString()} , "30m" )
    const url = `${process.env.BASE_URL}/varification/${tokenEmailVarification}`
    
    sendVarifiedEmail(user.email, user.fName, url)
    return res.status(200).json({
        message : "Email Varification Link Has Been Send To Your Account"
    })
    
  } catch (err) {
    res.status(400).json({
        message : err.message
    })
  }
}

module.exports = reVarificationController
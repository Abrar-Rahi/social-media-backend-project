
var jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');


const varificationController = async (req,res) => {
  try {
    const varify = req.user.id
    const {token} = req.body
    const user = jwt.verify(token, process.env.TOKEN)
    const existingToken = await userModel.findById(user.id)
    
    if(varify !== user.id){
      return res.status(400).json({
        message : "you don't have permission to complete the operation"
    })
    }
    if(existingToken.varified === true){
       return res.status(400).json({
            message : "The Email is already varified"
        })
    }else{
        await userModel.findOneAndUpdate({_id: user.id}, {varified : true})
        return res.status(200).json({
            message : "Account has been Activated Successfully"
        })
    } 
    
  } catch (err) {
    res.status(400).json({
        message : err.message
    })
  }
}

module.exports = varificationController
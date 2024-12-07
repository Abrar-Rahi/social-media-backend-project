const userModel = require("../models/userModel")

const updateDetails = async (req,res) => {
  try {
    
    const {userInformation} = req.body
    const update = await userModel.findByIdAndUpdate(req.user.id , {details: userInformation}, {new : true})
    
    res.send(update.details)
   
  } catch (err) {
    res.status(400).json({
        message : err.message
    })
  }
}

module.exports = updateDetails
const userModel = require("../models/userModel")

const updateProfilePicture = async (req,res) => {
  try {
    
    const {url} = req.body
    await userModel.findByIdAndUpdate(req.user.id , {profilePicture: url})
    
    res.json(url)
   
  } catch (err) {
    res.status(400).json({
        message : err.message
    })
  }
}

module.exports = updateProfilePicture
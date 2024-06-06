const UserModel = require("../models/userModel")
const emailValidation = require("../helpers/validation")
const nameValidation = require("../helpers/nameValidation")


let userController = async (req,res)=>{
  try {
    let {fName,lName,userName,email,password,bMonth,bDay,bYear,gender } = req.body

    let existingEmail = await UserModel.findOne({email})
    
    if(!emailValidation(email)) {
      return res.status(400).json({ 
        message : "invalid email address"
      })
    }else if(existingEmail){
      return res.status(400).json({ 
        message : "Email is already exists"
      })
    }else if(!nameValidation(fName,3,15) || !nameValidation(lName,3,15)){
      return res.status(400).json({ 
        message : "first and last name min 3 and max 15 letter must"
      })
    }

    let data = await new UserModel({
        fName,lName,userName,email,password,bMonth,bDay,bYear,gender
    })
    data.save()
    res.send(data)

  } 
  catch (error) {
    res.status(404).json({
        message : "can't create user"
    })
  }
}

module.exports = userController
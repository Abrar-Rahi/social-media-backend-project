const UserModel = require("../models/userModel")
const emailValidation = require("../helpers/validation")
const nameValidation = require("../helpers/nameValidation")
const bcrypt = require('bcrypt');
const validUserName = require("../helpers/validUserName");


let userController = async (req,res)=>{
  try {
    let {fName,lName,userName,email,password,bMonth,bDay,bYear,gender } = req.body

    let existingEmail = await UserModel.findOne({email})
    // validation conditions
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
    }else if(!nameValidation(password,8,20)){
      return res.status(400).json({ 
        message : "password should be minimum 8 digit"
      })
    }

    // password bcrypt
    let passBcrypt = await bcrypt.hash(password,10)
       

    //valid UserName
    let tempUserName = fName + lName
    let finalUserName = await validUserName(tempUserName)
    

      
    let data = await new UserModel({
        fName,
        lName,
        userName : finalUserName,
        email,
        password : passBcrypt,
        bMonth,
        bDay,
        bYear,
        gender
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


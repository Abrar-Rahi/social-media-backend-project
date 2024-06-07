const UserModel = require("../models/userModel")

const validUserName = async (username)=>{
    let isTrue = false
    do{

        let existUser = await UserModel.findOne({userName : username})
        if(existUser){
            username += (+new Date() * Math.random()).toString().substring(0,1)
            isTrue = true
        }else{
            isTrue = false
        }
        
    } while(isTrue)

    return username
}

module.exports = validUserName

console.log((+new Date() * Math.random()).toString().substring(0,1));
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const {ObjectId} = mongoose.Schema

const resetCodeModel = new Schema(
   {
    resetCode :{
        type : String,
        require : true
       },
    user : {
        type : ObjectId,
        ref : "usermodel",
        require : true
       }
   }

)

module.exports = mongoose.model("resetcode", resetCodeModel)
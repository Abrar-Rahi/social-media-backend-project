const jwt = require("jsonwebtoken")

exports.authecticationUser = async (req,res,next)=>{
     try {
        const temp = req.header("Authorization")
        const  token = temp ? temp.slice(7, temp.length) : ""
        if(!token){
            return res.status(404).json({
                message : "user have not valid token"
            })
        }
        jwt.verify(token, process.env.TOKEN, (err,user)=>{
              if(err){
                return res.status(404).json({
                    message : "invalid token"
                })
              }
              req.user = user
              next()
        })
     } catch (error) {
        res.status(404).json({
            message : error.message
        })
     }
}
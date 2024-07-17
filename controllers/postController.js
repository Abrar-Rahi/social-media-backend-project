const PostModel = require("../models/postModel")



exports.createPost = async (req,res)=>{
 try {
    const post = await new PostModel(req.body).save()
    res.json(post)
    
 } catch (error) {
    res.status(401).json({
        message: error.message 
    })
 }
}